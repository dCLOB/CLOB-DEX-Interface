import { MarketResponse } from "@/api/markets/types";
import { BASE_CURRENCY_RATIOS, TRADING_PAIRS } from "@/constants";
import { tradeService } from "@/app/api/mocks/services/trades";
import BigNumber from "bignumber.js";

export const dynamic = "force-dynamic";

export async function GET() {
  const response: MarketResponse[] = TRADING_PAIRS.map((pair) => {
    const trades = tradeService.getPairTrades(pair);
    const prices = trades.map((trade) => trade.price);
    const basePrice = BASE_CURRENCY_RATIOS[pair]; // used as 24h ago price for MOCK
    const lastPrice = tradeService.getLatestPrice(pair);

    return {
      id: pair,
      lastPrice,
      lowestPrice: trades.length ? Math.min(...prices) : basePrice,
      highestPrice: trades.length ? Math.max(...prices) : basePrice,
      priceChange: (lastPrice - basePrice) / lastPrice,
      baseVolume: trades.reduce((volume, trade) => volume.plus(trade.amount), BigNumber(0)).toString() as `${number}`,
      quoteVolume: trades
        .reduce((volume, trade) => volume.plus(BigNumber(trade.amount).multipliedBy(trade.price)), BigNumber(0))
        .toString() as `${number}`,
    };
  });

  return Response.json(response);
}
