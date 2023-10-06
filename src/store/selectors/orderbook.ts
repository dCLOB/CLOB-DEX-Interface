import { createSelector } from '@reduxjs/toolkit'
import { calculateOrderbookSide } from 'helpers/calculateOrderBookSide'

export const parsedAsksSelector = createSelector(
  (state: AppState) => state.orderbook.orderBook.asks,
  (state: AppState) => state.orderbook.priceAccuracy,
  (asks, priceAccuracy) => {
    const orders = calculateOrderbookSide(asks, priceAccuracy)

    return orders
  }
)

export const parsedBidsSelector = createSelector(
  (state: AppState) => state.orderbook.orderBook.bids,
  (state: AppState) => state.orderbook.priceAccuracy,
  (bids, priceAccuracy) => {
    const orders = calculateOrderbookSide(bids, priceAccuracy)

    return orders
  }
)

export const asksSelector = createSelector(
  (state: AppState) => state.orderbook.orderBook.asks,
  (value) => value
)

export const bidsSelector = createSelector(
  (state: AppState) => state.orderbook.orderBook.bids,
  (value) => value
)

export const priceAccuracySelector = createSelector(
  (state: AppState) => state.orderbook.priceAccuracy,
  (value) => value
)
