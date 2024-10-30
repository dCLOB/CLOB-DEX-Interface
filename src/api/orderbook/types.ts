export interface OrderbookItem {
  price: number;
  amount: number;
  total: number;
}

export interface OrderbookResponse {
  buy: OrderbookItem[];
  sell: OrderbookItem[];
}
