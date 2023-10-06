import { createSelector } from '@reduxjs/toolkit'
import { calculatePriceChange } from 'helpers/calculatePriceChange'

export const marketPairsSelector = createSelector(
  (state: AppState) => state.marketPairs.marketPairs,
  (value) => value
)

export const currentMarketPairSelector = createSelector(
  (state: AppState) => state.marketPairs.currentMarketPair,
  (value) => value
)

export const marketDataSelector = createSelector(
  currentMarketPairSelector,
  (state: AppState) => state.marketPairs.marketData,
  (currentMarketPair, marketData) => {
    const data =
      (currentMarketPair && marketData.find((market) => market.instrumentId === currentMarketPair.id)) || marketData[0]

    const changeValue = data && calculatePriceChange(data.tradePriceOpen24h, data.lastTradePrice)

    return (
      data && {
        ...data,
        ...changeValue,
      }
    )
  }
)

export const currentMarketPairSymbolSelector = createSelector(
  (state: AppState) => state.marketPairs.currentMarketPair?.ticker || 'USD/RUB',
  (value) => value
)

export const marketPairsListSelector = createSelector(
  (state: AppState) => state.marketPairs.marketPairs,
  (state: AppState) => state.marketPairs.marketData,
  (pairs, marketsData) => {
    return pairs.map((pair) => {
      const marketData = marketsData.find((market) => market.instrumentId === pair.id)

      const changeValues = marketData
        ? calculatePriceChange(marketData.tradePriceOpen24h, marketData.lastTradePrice)
        : { changeValue: undefined, numberChange: 0 }

      return {
        ...pair,
        lastTradePrice: marketData?.lastTradePrice,
        volume24h: marketData?.baseVolume,
        ...changeValues,
      }
    })
  }
)
