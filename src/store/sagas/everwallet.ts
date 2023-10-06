import ever from 'helpers/getProvider'
import { put } from 'redux-saga/effects'
import { EverWalletActions } from 'store/reducers/everwallet'
import { string } from 'yup'

export function* connectEverWalletSaga() {
  try {
    const hasProvider: boolean = yield ever.hasProvider()

    if (hasProvider) {
      yield ever.ensureInitialized()

      const { accountInteraction } = yield ever.requestPermissions({
        permissions: ['basic', 'accountInteraction'],
      })

      const data: {
        state: {
          balance: string
          boc: string
          isDeployed: boolean
          getTimings: {
            getLt: string
            getUtime: number
          }
          lastTransactionId: {
            isExact: boolean
            lt: string
          }
        }
      } = yield ever.getFullContractState({ address: accountInteraction.address._address })

      yield put(
        EverWalletActions.connectWalletData({
          address: accountInteraction.address._address,
          balance: +(+data.state.balance * 10 ** -9).toFixed(9),
        })
      )
    }
  } catch (error) {
    console.log(error)
    yield put(EverWalletActions.connectWalletError())
  }
}
