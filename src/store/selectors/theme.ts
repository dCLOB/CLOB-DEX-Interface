import { createSelector } from '@reduxjs/toolkit'

export const themeSelector = createSelector(
  (state: AppState) => state.theme.theme,
  (value) => value
)
