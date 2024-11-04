import { Order } from "@/api/orders/types";

export interface Trade {
  id: string;
  buyOrderId: string;
  sellOrderId: string;
  price: number;
  amount: number;
}

class TradeService {
  trades: Trade[];

  constructor() {
    this.trades = [];
  }

  addTrade(trade: Trade) {
    this.trades.push(trade);
  }

  calculateAveragePrice(order: Order) {
    const orderTrades = this.trades.filter((trade) =>
      order.side === "buy" ? trade.buyOrderId === order.id : trade.sellOrderId === order.id,
    );
    const averagePrice =
      orderTrades.reduce((total, trade) => total + trade.amount * trade.price, 0) /
      orderTrades.reduce((total, trade) => total + trade.amount, 0);

    return averagePrice;
  }
}

export const tradeService = new TradeService();
