import { all, call, takeLatest } from 'redux-saga/effects'
import { EverWalletActions } from 'store/reducers/everwallet'
import { connectEverWalletSaga } from './everwallet'

export default function* root() {
  yield all([takeLatest(EverWalletActions.connectWalletRequest, connectEverWalletSaga)])

  yield call(connectEverWalletSaga)
}
