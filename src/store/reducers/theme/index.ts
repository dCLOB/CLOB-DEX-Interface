import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DARK_THEME_KEY, ThemeState, ThemeType, THEME_STORAGE_KEY } from './types'

const initialState: ThemeState = {
  theme: (localStorage.getItem(THEME_STORAGE_KEY) as ThemeType) || DARK_THEME_KEY,
}

const { actions, reducer } = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<{ theme: ThemeType }>) => {
      state.theme = action.payload.theme
      localStorage.setItem(THEME_STORAGE_KEY, action.payload.theme)
    },
  },
})

export { actions as ThemeActions }

export default reducer
