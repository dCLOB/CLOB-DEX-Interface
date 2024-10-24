import { MarketResponse } from "@/api/markets/types";
import { randomNumber } from "@/app/api/utils";
import { TRADING_PAIRS } from "@/constants";

const CURRENCY_RATIOS = {
  "USDC-XLM": 10.5,
  "VELO-XLM": 0.9,
  "RIO-XLM": 8.88,
};

const MAX_DIFF = 0.05;

export async function GET() {
  const response: MarketResponse[] = TRADING_PAIRS.map((pair) => {
    const currentDiff = randomNumber(-MAX_DIFF, MAX_DIFF);
    const basePrice = CURRENCY_RATIOS[pair];

    return {
      id: pair,
      lastPrice: basePrice * (1 + currentDiff),
      lowestPrice: basePrice * (1 - MAX_DIFF),
      highestPrice: basePrice * (1 + MAX_DIFF),
      priceChange: currentDiff,
      baseVolume: 0,
      quoteVolume: 0,
    };
  });

  return Response.json(response);
}
