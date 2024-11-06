import { NextRequest } from "next/server";
import { tradeService } from "@/app/api/mocks/services/trades";
import dayjs from "dayjs";
import { BASE_CURRENCY_RATIOS } from "@/constants";

// t: Bar time. Unix timestamp (UTC)
// c: Closing price
// o: Opening price (optional)
// h: High price (optional)
// l: Low price (optional)
// v: Volume (optional)

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") as keyof typeof BASE_CURRENCY_RATIOS;

  const to = Number(request.nextUrl.searchParams.get("to")) || 0;
  const countback = Number(request.nextUrl.searchParams.get("countback")) || 0;
  const resolution = Number(request.nextUrl.searchParams.get("resolution")) || 1;

  const trades = tradeService.getPairTrades(symbol);
  const t = Array.from({ length: countback }, (v, i) => to - resolution * 60 * i).reverse();

  const history = t.map((tItem, i) => {
    const periodTrades = trades.filter(
      (trade) =>
        dayjs(trade.createdAt).isAfter(dayjs.unix(tItem)) &&
        (t[i] ? dayjs(trade.createdAt).isBefore(dayjs.unix(t[i + 1])) : true),
    );

    const lastPrice = tradeService.getLatestPrice(symbol);

    const firstTrade = dayjs(tradeService.getPairTrades(symbol).at(0)?.createdAt).unix();
    const lastPriceFixed = tItem >= firstTrade ? lastPrice : BASE_CURRENCY_RATIOS[symbol];

    return {
      c: periodTrades.at(-1)?.price ?? lastPriceFixed,
      o: periodTrades.at(0)?.price ?? lastPriceFixed,
      h: periodTrades.length ? Math.max(...periodTrades.map((trade) => trade.price)) : lastPriceFixed,
      l: periodTrades.length ? Math.min(...periodTrades.map((trade) => trade.price)) : lastPriceFixed,
      v: periodTrades.reduce((v, trade) => v + trade.amount * trade.price, 0),
    };
  });

  const res = {
    s: "ok",
    o: history.map((h) => h.o),
    c: history.map((h) => h.c),
    h: history.map((h) => h.h),
    l: history.map((h) => h.l),
    v: history.map((h) => h.v),
    t,
    a: null,
  };

  return Response.json(res);
}
