import { nanoid } from "nanoid";
import { Order, OrderCreateData } from "@/api/orders/types";

export interface UserData {
  id: string;
  address: string; //wallet address
  balance: {
    [key: string]: number;
  };
}

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
    };

    this.orders.push(order);

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
    return this.getOpenOrders().filter((order) => order.userId === user.id);
  }

  cancelOrder(id: Order["id"]) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) throw new Error("not found");

    order.status = "canceled";
    order.active = false;
    order.updatedAt = new Date().toJSON();
  }
}

export const orderService = new OrderService();
