import { nanoid } from "nanoid";
import { Order, OrderCreateData } from "@/api/orders/types";
import { userService } from "@/app/api/mocks/services/users";
import { getCurrenciesFromPair } from "@/utils";
import { tradeService } from "@/app/api/mocks/services/trades";
import BigNumber from "bignumber.js";

export interface UserData {
  id: string;
  address: string; //wallet address
  balance: {
    [key: string]: number;
  };
}

interface Orderbook {
  sell: Record<number, BigNumber>;
  buy: Record<number, BigNumber>;
}

const matchTypes = (a: Order, b: Order) => {
  if (a.type === b.type) return 0;
  if (a.type === "market") return -1;
  return 1;
};

const getOrderbookValues = (values: Record<number, BigNumber>) =>
  Object.entries(values)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([price, amount]) => ({ price: Number(price), amount, total: amount.multipliedBy(price).toNumber() }));

class OrderService {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  createOrder(data: OrderCreateData, user: UserData) {
    const order: Order = {
      ...data,
      id: nanoid(),
      userId: user.id,
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
      status: "open",
      filled: 0,
      active: true,
      averagePrice: 0,
      price: data.type === "market" ? tradeService.getLatestPrice(data.pair) : data.price, // store current price in market order for future calculations
    };

    this.orders.push(order);

    console.log("#####################################");
    console.log(
      `order created ${order.id}, pair: ${order.pair}, type: ${order.type}, side: ${order.side}, amount: ${order.amount}, price: ${order.price}`,
    );

    const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(order.pair);
    const token = order.side === "sell" ? baseCurrency : quoteCurrency;
    const value = (order.side === "sell" ? order.amount : order.amount * order.price) * -1;

    userService.addBalance(user.address, token, value);
    console.log(`balance adjusted ${order.id}, user: ${user.address}, balance ${value} ${token}`);

    console.log("#####################################");

    this.matchOrders(order);

    return order;
  }

  getOpenOrders() {
    return this.orders.filter((order) => order.active);
  }

  getClosedOrders() {
    return this.orders.filter((order) => !order.active);
  }

  getUserOpenOrders(user: UserData) {
    return this.getOpenOrders().filter((order) => order.userId === user.id);
  }

  getUserClosedOrders(user: UserData) {
    return this.getClosedOrders().filter((order) => order.userId === user.id);
  }

  cancelOrder(id: Order["id"]) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) throw new Error("not found");

    order.status = "canceled";
    order.active = false;
    order.updatedAt = new Date().toJSON();

    const user = userService.getUserById(order.userId);
    const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(order.pair);
    const unfulfilled = order.amount - order.filled;
    userService.addBalance(
      user!.address,
      order.side === "sell" ? baseCurrency : quoteCurrency,
      order.side === "sell" ? unfulfilled : unfulfilled * order.price,
    );
    console.log(
      `balance adjusted ${order.id}, user: ${user!.address}, balance ${order.side === "sell" ? unfulfilled * order.price : unfulfilled} ${order.side === "sell" ? quoteCurrency : baseCurrency}`,
    );
  }

  getOrderbook(pair: string) {
    const pairOpenOrders = this.orders.filter(
      (order) => order.pair === pair && order.type !== "market" && order.active,
    );

    const orderbook = pairOpenOrders.reduce(
      (orderbook, order) => {
        const unfilledAmount = BigNumber(order.amount).minus(order.filled);
        const orderBookAmount = BigNumber(orderbook[order.side][order.price]);
        if (orderbook[order.side][order.price] !== undefined) {
          orderbook[order.side][order.price] = orderBookAmount.plus(unfilledAmount);
        } else {
          orderbook[order.side][order.price] = unfilledAmount;
        }
        return orderbook;
      },
      { sell: {}, buy: {} } as Orderbook,
    );

    return {
      sell: getOrderbookValues(orderbook.sell).slice(0, 5),
      buy: getOrderbookValues(orderbook.buy).slice(0, 5),
    };
  }

  matchOrders(newOrder: Order) {
    console.log(
      `start matching new order ${newOrder.id}, type: ${newOrder.type},  amount: ${newOrder.amount}, limit price: ${newOrder.price}`,
    );

    const newOrderUser = userService.getUserById(newOrder.userId) as UserData;
    const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(newOrder.pair);

    const matchedOrders = this.orders.filter(
      (order) =>
        order.active && // active order
        order.userId !== newOrder.userId && // from other users
        order.pair === newOrder.pair && // same pair
        order.side !== newOrder.side && // match buy with sell
        (newOrder.type === "market" ? order.type !== "market" : true) && // prevent market-market
        (newOrder.type === "limit"
          ? newOrder.side === "buy"
            ? order.price <= newOrder.price
            : order.price >= newOrder.price
          : true), // with appropriate price
    );
    if (!matchedOrders.length) console.log(`matched orders not fount for order ${newOrder.id}`);

    // sort matched orders by priority
    matchedOrders.sort(
      (a, b) =>
        matchTypes(a, b) || // market, then limit
        (newOrder.side === "sell" ? b.price - a.price : a.price - b.price) || // sort by price
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(), // sort by time
    );

    matchedOrders.forEach((matchedOrder) => {
      if (!newOrder.active) return; //filled by previous matched

      console.log(
        `fount matched order ${matchedOrder.id}, amount: ${matchedOrder.amount}, price: ${matchedOrder.price}`,
      );
      const fillableAmount = BigNumber.min(
        BigNumber(newOrder.amount).minus(newOrder.filled),
        BigNumber(matchedOrder.amount).minus(matchedOrder.filled),
      );
      console.log(`fillable amount: ${fillableAmount}`);
      newOrder.filled = fillableAmount.plus(newOrder.filled).toNumber();
      const isNewOrderFilled = newOrder.filled === newOrder.amount;
      newOrder.status = isNewOrderFilled ? "filled" : "partiallyFilled";
      if (isNewOrderFilled) newOrder.active = false;

      console.log(`new order is filled: ${newOrder.filled}, status: ${newOrder.status}, active: ${newOrder.active}`);

      matchedOrder.filled = fillableAmount.plus(matchedOrder.filled).toNumber();
      const isMatchedOrderFilled = matchedOrder.filled === matchedOrder.amount;
      matchedOrder.status = isMatchedOrderFilled ? "filled" : "partiallyFilled";
      if (isMatchedOrderFilled) matchedOrder.active = false;
      console.log(
        `matched order is filled: ${matchedOrder.filled}, status: ${matchedOrder.status}, active: ${matchedOrder.active}`,
      );

      const trade = tradeService.addTrade({
        sellOrderId: newOrder.side === "sell" ? newOrder.id : matchedOrder.id,
        buyOrderId: newOrder.side === "buy" ? newOrder.id : matchedOrder.id,
        amount: fillableAmount.toNumber(),
        price: matchedOrder.price,
        pair: matchedOrder.pair,
      });

      newOrder.updatedAt = trade.createdAt;
      matchedOrder.updatedAt = trade.createdAt;

      newOrder.averagePrice = tradeService.calculateAveragePrice(newOrder.id);
      matchedOrder.averagePrice = tradeService.calculateAveragePrice(matchedOrder.id);

      userService.addBalance(
        newOrderUser.address,
        newOrder.side === "sell" ? quoteCurrency : baseCurrency,
        (newOrder.side === "sell" ? fillableAmount.multipliedBy(matchedOrder.price) : fillableAmount).toNumber(),
      );
      console.log(
        `balance adjusted ${newOrder.id}, user: ${newOrderUser.address}, balance ${newOrder.side === "sell" ? fillableAmount.multipliedBy(matchedOrder.price) : fillableAmount} ${newOrder.side === "sell" ? quoteCurrency : baseCurrency}`,
      );

      const matchedOrderUser = userService.getUserById(matchedOrder.userId) as UserData;
      userService.addBalance(
        matchedOrderUser.address,
        matchedOrder.side === "sell" ? quoteCurrency : baseCurrency,
        (matchedOrder.side === "sell" ? fillableAmount.multipliedBy(matchedOrder.price) : fillableAmount).toNumber(),
      );
      console.log(
        `balance adjusted ${matchedOrder.id}, user: ${matchedOrderUser.address}, balance ${matchedOrder.side === "sell" ? fillableAmount.multipliedBy(matchedOrder.price) : fillableAmount} ${matchedOrder.side === "sell" ? quoteCurrency : baseCurrency}`,
      );
      // this.closeOrderIfNeeded(matchedOrder, matchedOrderUser);
      console.log("------------------------------------------------------");
    });

    //////!!!!!!
    this.closeOrderIfNeeded(newOrder, newOrderUser);
    console.log("======================================================");
  }

  closeOrderIfNeeded(order: Order, user: UserData) {
    if ((order.type === "market" && order.active) || (order.type === "limit" && order.active && order.filled)) {
      //close unfulfilled order and create limit order for unfulfilled part
      order.active = false;
      order.updatedAt = new Date().toJSON();
      order.status = order.filled ? "partiallyFilled" : "canceled";
      console.log(`order ${order.id} closed. filled: ${order.filled}/${order.amount}`);
      const unfulfilledAmount = BigNumber(order.amount).minus(order.filled);
      // return unfulfilled part to market order user
      const { baseCurrency, quoteCurrency } = getCurrenciesFromPair(order.pair);

      if (order.side === "sell") {
        userService.addBalance(user.address, baseCurrency, unfulfilledAmount.toNumber());
        console.log(
          `balance adjusted ${order.id}, user: ${user.address}, balance ${unfulfilledAmount} ${baseCurrency}`,
        );
      } else {
        const orderTrades = tradeService.getOrderTrades(order.id);
        const diff =
          order.amount * order.price - orderTrades.reduce((total, trade) => total + trade.price * trade.amount, 0);
        userService.addBalance(user.address, quoteCurrency, diff);
        console.log(`balance adjusted ${order.id}, user: ${user.address}, balance ${diff} ${quoteCurrency}`);
      }

      this.createOrder(
        {
          pair: order.pair,
          side: order.side,
          // price: tradeService.getLatestPrice(order.pair),
          price: order.price,
          amount: unfulfilledAmount.toNumber(),
          type: "limit",
          orderBookId: order.orderBookId,
        },
        user,
      );
    }
  }

  reset() {
    this.orders = [];
  }
}

export const orderService = new OrderService();
