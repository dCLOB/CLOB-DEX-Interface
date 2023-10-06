import { createSelector } from '@reduxjs/toolkit'

export const languageSelector = createSelector(
  (state: AppState) => state.lang.lang,
  (value) => value
)
