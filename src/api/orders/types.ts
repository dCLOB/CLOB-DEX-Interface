export type OrderSide = "sell" | "buy";
export type OrderType = "limit" | "market";
export type OrderStatus = "open" | "partiallyFilled" | "filled" | "canceled";

export interface Order {
  id: string;
  pair: string;
  side: OrderSide;
  price: number; // limit price, 0 - for market order
  amount: number;
  filled: number; // filled amount;
  type: OrderType;
  userId: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  active: boolean; // active
  averagePrice: number; // for filled order, 0 - for unfilled
}

export type OrderCreateData = Pick<Order, "pair" | "side" | "price" | "amount" | "type">;
