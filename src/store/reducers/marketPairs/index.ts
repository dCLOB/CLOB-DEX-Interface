import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarketPairsState, MarketData, DumpedMarketDataInterface } from './types'

export const initialState: MarketPairsState = {
  marketPairs: [],
  loading: false,
  error: false,
  marketData: [],
  marketDataError: false,
  marketDataLoading: false,
  favoriteRequestError: false,
  favoriteRequestLoading: false,
}

const { actions, reducer } = createSlice({
  name: 'marketPairs',
  initialState,
  reducers: {
    marketPairsListRequest: (state) => {
      state.loading = true
      state.error = false
    },
    marketPairsListSuccess: (state, action: PayloadAction<{ marketPairs: DumpedMarketDataInterface[] }>) => {
      state.loading = false
      state.marketPairs = action.payload.marketPairs
    },
    marketPairsListFailure: (state) => {
      state.loading = false
      state.error = true
    },
    setCurrentMarketPair: (state, action: PayloadAction<{ marketPair: DumpedMarketDataInterface }>) => {
      state.currentMarketPair = action.payload.marketPair
    },
    marketDataRequest: (state) => {
      state.marketDataLoading = true
      state.marketDataError = true
    },
    marketDataSuccess: (state, action: PayloadAction<MarketData[]>) => {
      state.marketDataLoading = false
      state.marketData = action.payload
    },
    marketDataFailure: (state) => {
      state.marketDataError = true
      state.marketDataLoading = false
    },
    setMarketData: (state, action: PayloadAction<MarketData[]>) => {
      state.marketData = action.payload
    },
  },
})

export { actions as MarketPairsActions }
export default reducer
