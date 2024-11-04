import { MarketResponse } from "@/api/markets/types";
import { TRADING_PAIRS } from "@/constants";
import { tradeService } from "@/app/api/mocks/services/trades";

export const dynamic = "force-dynamic";

const BASE_CURRENCY_RATIOS = {
  "USDC-XLM": 10.5,
  "VELO-XLM": 0.9,
  "RIO-XLM": 8.88,
};

export async function GET() {
  const response: MarketResponse[] = TRADING_PAIRS.map((pair) => {
    const trades = tradeService.getPairTrades(pair);
    const prices = trades.map((trade) => trade.price);
    const basePrice = BASE_CURRENCY_RATIOS[pair]; // used as 24h ago price for MOCK
    const lastPrice = prices.at(-1) ?? basePrice;

    return {
      id: pair,
      lastPrice,
      lowestPrice: trades.length ? Math.min(...prices) : basePrice,
      highestPrice: trades.length ? Math.max(...prices) : basePrice,
      priceChange: (lastPrice - basePrice) / basePrice,
      baseVolume: trades.reduce((volume, trade) => volume + trade.amount, 0),
      quoteVolume: trades.reduce((volume, trade) => volume + trade.amount * trade.price, 0),
    };
  });

  return Response.json(response);
}
