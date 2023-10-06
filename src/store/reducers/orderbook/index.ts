/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderBookState, OrderBookTradeType, OrderBookType } from './types'

export const initialState: OrderBookState = {
  orderBook: {
    asks: [
      {
        price: 657.62,
        volume: 12.43,
      },
      {
        price: 657.34,
        volume: 0.56,
      },
      {
        price: 657.32,
        volume: 0.1,
      },
      {
        price: 656.82,
        volume: 1.31,
      },
      {
        price: 656.62,
        volume: 0.2,
      },
      {
        price: 653.62,
        volume: 10.2,
      },
      {
        price: 650.62,
        volume: 10.2,
      },
    ],
    bids: [
      {
        price: 657.62,
        volume: 12.43,
      },
      {
        price: 657.34,
        volume: 0.56,
      },
      {
        price: 657.32,
        volume: 0.1,
      },
      {
        price: 656.82,
        volume: 1.31,
      },
      {
        price: 656.62,
        volume: 0.2,
      },
      {
        price: 653.62,
        volume: 10.2,
      },
      {
        price: 650.62,
        volume: 10.2,
      },
    ],
  },
  priceAccuracy: 0.01,
  loading: false,
  error: false,
}

const { actions, reducer } = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    orderbookListRequest: (state, action: PayloadAction<{ instrumentId: number }>) => {
      state.loading = true
      state.error = false
    },
    orderbookListSuccess: (state, action: PayloadAction<OrderBookType>) => {
      state.loading = false
      state.orderBook = action.payload
    },
    orderbookListFailure: (state) => {
      state.loading = false
      state.error = true
    },
    addOrderbookLine: (state, action: PayloadAction<any>) => {},
    changeOrderbookLine: (state, action: PayloadAction<any>) => {},
    removeOrderbookLine: (state, action: PayloadAction<any>) => {},
    setAsks: (state, action: PayloadAction<{ asks: OrderBookTradeType[] }>) => {
      state.orderBook.asks = action.payload.asks
    },
    setBids: (state, action: PayloadAction<{ bids: OrderBookTradeType[] }>) => {
      state.orderBook = {
        ...state.orderBook,
        bids: action.payload.bids,
      }
    },
    setPriceAccuracy: (state, action: PayloadAction<{ accuracy: number }>) => {
      state.priceAccuracy = action.payload.accuracy
    },
  },
})

export { actions as OrderbookActions }
export default reducer
