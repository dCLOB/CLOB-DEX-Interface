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

const matchTypes = (a: Order, b: Order) => {
  if (a.type === b.type) return 0;
  if (a.type === "market") return -1;
  return 1;
};

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
    };

    this.orders.push(order);

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
        (order.price as number) * order.amount,
      );
  }

  getOrderbook(pair: string) {
    const pairOpenOrders = this.orders.filter(
      (order) => order.pair === pair && order.type !== "market" && order.active,
    );

    const sellOrders = pairOpenOrders
      .filter((order) => order.side === "sell")
      .reverse()
      .slice(0, 5);
    const buyOrders = pairOpenOrders
      .filter((order) => order.side === "buy")
      .reverse()
      .slice(0, 5);

    return {
      sell: sellOrders
        .sort((a, b) => b.price - a.price)
        .map(({ price, amount, filled }) => ({
          price,
          amount: amount - filled,
          total: price * (amount - filled),
        })),
      buy: buyOrders
        .sort((a, b) => b.price - a.price)
        .map(({ price, amount, filled }) => ({
          price,
          amount: amount - filled,
          total: price * (amount - filled),
        })),
    };
  }

  matchOrders(newOrder: Order) {
    console.log(
      `start matching new order ${newOrder.id}, type: ${newOrder.type},  amount: ${newOrder.amount}, limit price: ${newOrder.price}`,
    );

    const matchedOrders = this.orders.filter(
      (order) =>
        order.active && // active order
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
      // TODO new order user balance

      matchedOrder.filled = matchedOrder.filled + fillableAmount;
      const isMatchedOrderFilled = matchedOrder.filled === matchedOrder.amount;
      matchedOrder.status = isMatchedOrderFilled ? "filled" : "partiallyFilled";
      if (isMatchedOrderFilled) matchedOrder.active = false;
      console.log(
        `matched order is filled: ${matchedOrder.filled}, status: ${matchedOrder.status}, active: ${matchedOrder.active}`,
      );

      tradeService.addTrade({
        sellOrderId: newOrder.side === "sell" ? newOrder.id : matchedOrder.id,
        buyOrderId: newOrder.side === "buy" ? newOrder.id : matchedOrder.id,
        amount: fillableAmount,
        price: matchedOrder.price,
        pair: matchedOrder.pair,
      });

      newOrder.averagePrice = tradeService.calculateAveragePrice(newOrder);
      matchedOrder.averagePrice = tradeService.calculateAveragePrice(matchedOrder);

      console.log("------------------------------------------------------");
    });

    if (newOrder.type === "market" && newOrder.active) {
      //close unfulfilled market order and create limit order for unfulfilled part
      newOrder.active = false;
      console.log(`marked order ${newOrder.id} closed. filled: ${newOrder.filled}/${newOrder.amount}`);

      const newLimitOrder = this.createOrder(
        {
          pair: newOrder.pair,
          side: newOrder.side,
          price: tradeService.getLatestPrice(newOrder.pair),
          amount: newOrder.amount - newOrder.filled,
          type: "limit",
        },
        userService.getUserById(newOrder.id) as UserData,
      );
      console.log(`new limit order ${newLimitOrder.id} opened. amount: ${newOrder.amount}`);
      this.matchOrders(newLimitOrder);
    }

    console.log("======================================================");
  }
}

export const orderService = new OrderService();
