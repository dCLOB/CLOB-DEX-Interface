export interface MarketResponse {
  id: string; //pair
  lastPrice: number;
  lowestPrice: number; // per 24h
  highestPrice: number; // per 24h
  priceChange: number; // percent per 24h %
  baseVolume: number; // base currency volume
  quoteVolume: number; // quote currency volume (XLM)
}
