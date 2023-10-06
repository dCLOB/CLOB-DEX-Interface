export type TradeType = {
  price: number
  amount: number
  time: string
}

export interface TradesState {
  trades: TradeType[]
  loading: boolean
  error: boolean
}
