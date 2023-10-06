import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import history from 'helpers/history'

//reducers
import everwallet from './everwallet'
import lang from './lang'
import marketPairs from './marketPairs'
import orderbook from './orderbook'
import theme from './theme'
import trades from './trades'

//states
import { EverWalletState } from './everwallet/types'
import { LangState } from './lang/types'
import { MarketPairsState } from './marketPairs/types'
import { OrderBookState } from './orderbook/types'
import { ThemeState } from './theme/types'
import { TradesState } from './trades/types'

const rootReducer = combineReducers({
  router: connectRouter(history),
  lang,
  everwallet,
  marketPairs,
  orderbook,
  theme,
  trades,
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  everwallet: EverWalletState
  lang: LangState
  marketPairs: MarketPairsState
  orderbook: OrderBookState
  theme: ThemeState
  trades: TradesState
}

declare global {
  type AppState = RootState
  type AppSelector<T = unknown> = (state: AppState) => T
}

// With this, `useSelector(state => ...)` automatically infers `state` param as `AppState`
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends AppState {}
}

export default rootReducer
