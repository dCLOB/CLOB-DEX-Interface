import { nanoid } from "nanoid";
import { Order, OrderCreateData, OrderStatus } from "@/api/orders/types";

export interface UserData {
  id: string;
  address: string; //wallet address
  balance: {
    [key: string]: number;
  };
}

const openStatuses: OrderStatus[] = ["open", "partiallyFilled"];

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
    };

    this.orders.push(order);

    return order;
  }

  getOpenOrders() {
    return this.orders.filter((order) => openStatuses.includes(order.status));
  }

  getClosedOrders() {
    return this.orders.filter((order) => !openStatuses.includes(order.status));
  }

  getUserOpenOrders(user: UserData) {
    return this.getOpenOrders().filter((order) => order.userId === user.id);
  }

  getUserClosedOrders(user: UserData) {
    return this.getOpenOrders().filter((order) => order.userId === user.id);
  }
}

export const orderService = new OrderService();
