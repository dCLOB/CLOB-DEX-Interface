import { createSelector } from '@reduxjs/toolkit'

export const walletAddressSelector = createSelector(
  (state: AppState) => state.everwallet.address,
  (value) => value
)

export const walletBalanceSelector = createSelector(
  (state: AppState) => state.everwallet.balance,
  (value) => value
)
