import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EverWalletState } from './types'

const initialState: EverWalletState = {
  error: false,
  loading: false,
  address: '',
  balance: 0,
}

const { actions, reducer } = createSlice({
  name: 'everwallet',
  initialState,
  reducers: {
    connectWalletRequest: (state) => {
      state.error = false
      state.loading = true
    },
    connectWalletData: (state, action: PayloadAction<{ address: string; balance: number }>) => {
      state.loading = false
      state.address = action.payload.address
      state.balance = action.payload.balance
    },
    connectWalletError: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export { actions as EverWalletActions }

export default reducer
