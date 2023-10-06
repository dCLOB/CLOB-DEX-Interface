import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LangState } from './types'

const initialState: LangState = {
  lang: 'en',
}

const { actions, reducer } = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setCurrentLang: (state, action: PayloadAction<{ lang: string }>) => {
      state.lang = action.payload.lang
    },
  },
})

export { actions as LanguageActions }

export default reducer
