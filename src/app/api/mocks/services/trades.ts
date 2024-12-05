import { BASE_CURRENCY_RATIOS } from "@/constants";
import { nanoid } from "nanoid";
import BigNumber from "bignumber.js";

export interface Trade {
  id: string;
  buyOrderId: string;
  sellOrderId: string;
  price: number;
  amount: number;
  pair: string;
  createdAt: string;
}

class TradeService {
  trades: Trade[];

  constructor() {
    this.trades = [];
  }

  addTrade(trade: Omit<Trade, "id" | "createdAt">) {
    const newTrade = { ...trade, id: nanoid(), createdAt: new Date().toJSON() };
    this.trades.push(newTrade);
    return newTrade;
  }

  getOrderTrades(orderId: string) {
    return this.trades.filter((trade) => trade.buyOrderId === orderId || trade.sellOrderId === orderId);
  }

  calculateAveragePrice(orderId: string) {
    const orderTrades = this.getOrderTrades(orderId);
    const averagePrice = orderTrades
      .reduce((total, trade) => total.plus(BigNumber(trade.amount).multipliedBy(trade.price)), BigNumber(0))
      .dividedBy(orderTrades.reduce((total, trade) => total.plus(trade.amount), BigNumber(0)));
    return averagePrice.toNumber();
  }

  getPairTrades(pair: string) {
    return this.trades.filter((trade) => trade.pair === pair);
  }

  getLatestPrice(pair: string) {
    return this.getPairTrades(pair).at(-1)?.price ?? BASE_CURRENCY_RATIOS[pair as keyof typeof BASE_CURRENCY_RATIOS];
  }

  reset() {
    this.trades = [];
  }
}

export const tradeService = new TradeService();
