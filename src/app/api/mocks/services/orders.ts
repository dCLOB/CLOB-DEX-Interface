import { nanoid } from "nanoid";
import { Order, OrderCreateData } from "@/api/orders/types";
import { userService } from "@/app/api/mocks/services/users";
import { getCurrenciesFromPair } from "@/utils";
import { tradeService } from "@/app/api/mocks/services/trades";

export interface UserData {
  id: string;
  address: string; //wallet address
  balance: {
    [key: string]: number;
  };
}

interface Orderbook {
  sell: Record<number, number>;
  buy: Record<number, number>;
}

const matchTypes = (a: Order, b: Order) => {
  if (a.type === b.type) return 0;
  if (a.type === "market") return -1;
  return 1;
};

const getOrderbookValues = (values: Record<number, number>) =>
  Object.entries(values)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([price, amount]) => ({ price: Number(price), amount, total: Number(price) * amount }));

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
    if (user)
      userService.addBalance(
        user.address,
        getCurrenciesFromPair(order.pair).quoteCurrency,
        (order.price as number) * (order.amount - order.filled),
      );
  }

  getOrderbook(pair: string) {
    const pairOpenOrders = this.orders.filter(
      (order) => order.pair === pair && order.type !== "market" && order.active,
    );

    const orderbook = pairOpenOrders.reduce(
      (orderbook, order) => {
        const unfilledAmount = order.amount - order.filled;
        const orderBookAmount = orderbook[order.side][order.price];
        if (orderbook[order.side][order.price] !== undefined) {
          orderbook[order.side][order.price] = orderBookAmount + unfilledAmount;
        } else {
          orderbook[order.side][order.price] = unfilledAmount;
        }
        return orderbook;
      },
      { sell: {}, buy: {} } as Orderbook,
    );

    return {
      sell: getOrderbookValues(orderbook.sell),
      buy: getOrderbookValues(orderbook.buy),
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
      const fillableAmount = Math.min(newOrder.amount - newOrder.filled, matchedOrder.amount - matchedOrder.filled);
      console.log(`fillable amount: ${fillableAmount}`);
      newOrder.filled = newOrder.filled + fillableAmount;
      const isNewOrderFilled = newOrder.filled === newOrder.amount;
      newOrder.status = isNewOrderFilled ? "filled" : "partiallyFilled";
      if (isNewOrderFilled) newOrder.active = false;

      console.log(`new order is filled: ${newOrder.filled}, status: ${newOrder.status}, active: ${newOrder.active}`);

      matchedOrder.filled = matchedOrder.filled + fillableAmount;
      const isMatchedOrderFilled = matchedOrder.filled === matchedOrder.amount;
      matchedOrder.status = isMatchedOrderFilled ? "filled" : "partiallyFilled";
      if (isMatchedOrderFilled) matchedOrder.active = false;
      console.log(
        `matched order is filled: ${matchedOrder.filled}, status: ${matchedOrder.status}, active: ${matchedOrder.active}`,
      );

      const trade = tradeService.addTrade({
        sellOrderId: newOrder.side === "sell" ? newOrder.id : matchedOrder.id,
        buyOrderId: newOrder.side === "buy" ? newOrder.id : matchedOrder.id,
        amount: fillableAmount,
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
        newOrder.side === "sell" ? fillableAmount * matchedOrder.price : fillableAmount,
      );
      console.log(
        `balance adjusted ${newOrder.id}, user: ${newOrderUser.address}, balance ${newOrder.side === "sell" ? fillableAmount * matchedOrder.price : fillableAmount} ${newOrder.side === "sell" ? quoteCurrency : baseCurrency}`,
      );

      const matchedOrderUser = userService.getUserById(matchedOrder.userId) as UserData;
      userService.addBalance(
        matchedOrderUser.address,
        matchedOrder.side === "sell" ? quoteCurrency : baseCurrency,
        matchedOrder.side === "sell" ? fillableAmount * matchedOrder.price : fillableAmount,
      );
      console.log(
        `balance adjusted ${matchedOrder.id}, user: ${matchedOrderUser.address}, balance ${matchedOrder.side === "sell" ? fillableAmount * matchedOrder.price : fillableAmount} ${matchedOrder.side === "sell" ? quoteCurrency : baseCurrency}`,
      );

      console.log("------------------------------------------------------");
    });

    if (newOrder.type === "market" && newOrder.active) {
      //close unfulfilled market order and create limit order for unfulfilled part
      newOrder.active = false;
      newOrder.updatedAt = new Date().toJSON();
      console.log(`marked order ${newOrder.id} closed. filled: ${newOrder.filled}/${newOrder.amount}`);
      const unfulfilledAmount = newOrder.amount - newOrder.filled;
      // return unfulfilled part to market order user
      if (newOrder.side === "sell") {
        userService.addBalance(newOrderUser.address, baseCurrency, unfulfilledAmount);
        console.log(
          `balance adjusted ${newOrderUser.id}, user: ${newOrderUser.address}, balance ${unfulfilledAmount} ${baseCurrency}`,
        );
      } else {
        const orderTrades = tradeService.getOrderTrades(newOrder.id);
        const diff =
          newOrder.amount * newOrder.price -
          orderTrades.reduce((total, trade) => total + trade.price * trade.amount, 0);
        userService.addBalance(newOrderUser.address, quoteCurrency, diff);
        console.log(
          `balance adjusted ${newOrderUser.id}, user: ${newOrderUser.address}, balance ${diff} ${quoteCurrency}`,
        );
      }

      const newLimitOrder = this.createOrder(
        {
          pair: newOrder.pair,
          side: newOrder.side,
          price: tradeService.getLatestPrice(newOrder.pair),
          amount: unfulfilledAmount,
          type: "limit",
        },
        newOrderUser,
      );
      console.log(`new limit order ${newLimitOrder.id} opened. amount: ${newOrder.amount}`);
      this.matchOrders(newLimitOrder);
    }

    console.log("======================================================");
  }
}

export const orderService = new OrderService();
