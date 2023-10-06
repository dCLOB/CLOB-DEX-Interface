import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TradesState } from './types'

const initialState: TradesState = {
  error: false,
  loading: false,
  trades: [],
}

const { actions, reducer } = createSlice({
  name: 'trades',
  initialState,
  reducers: {},
})

export { actions as TradesActions }
export default reducer
