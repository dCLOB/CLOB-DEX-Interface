import { Order } from "@/api/orders/types";
import { BASE_CURRENCY_RATIOS } from "@/constants";

export interface Trade {
  id: string;
  buyOrderId: string;
  sellOrderId: string;
  price: number;
  amount: number;
  pair: string;
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

  getPairTrades(pair: string) {
    return this.trades.filter((trade) => trade.pair === pair);
  }

  getLatestPrice(pair: string) {
    return this.getPairTrades(pair).at(-1)?.price ?? BASE_CURRENCY_RATIOS[pair as keyof typeof BASE_CURRENCY_RATIOS];
  }
}

export const tradeService = new TradeService();