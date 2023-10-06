export interface MarketPairType {
  id: number
  baseAssetName: string
  baseAssetId: number
  quoteAssetName: string
  quoteAssetId: number
  ticker: string
  fullName: string
  priceDecimals: number
  qtyDecimals: number
}

export interface FavoriteInstrumentsDataInterface {
  userId: number
  instrumentId: number
  isFavorite: boolean
}

export interface MarketData {
  instrumentId: number
  baseVolume: number
  quoteVolume: number
  bestBuy: number
  bestSell: number
  lastTradePrice: number
  tradePriceOpen24h: number
  high24h: number
  low24h: number
  updated: string
}

export interface DumpedMarketDataInterface extends MarketPairType {
  isFavorite: boolean
}

export interface MarketPairsState {
  marketPairs: DumpedMarketDataInterface[]
  loading: boolean
  error: boolean
  currentMarketPair?: DumpedMarketDataInterface
  marketData: MarketData[]
  marketDataLoading: boolean
  marketDataError: boolean
  favoriteRequestLoading: boolean
  favoriteRequestError: boolean
}
