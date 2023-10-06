export interface OrderBookTradeType {
  price: number
  volume: number
}

export interface OrderBookType {
  bids: OrderBookTradeType[]
  asks: OrderBookTradeType[]
}

export interface OrderBookState {
  orderBook: OrderBookType
  loading: boolean
  error: boolean
  priceAccuracy: number
}
