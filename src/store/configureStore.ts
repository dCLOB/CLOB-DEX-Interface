import { configureStore } from '@reduxjs/toolkit'
import rootSaga from './sagas'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'

export type { RootState } from './reducers'

export default function configStore() {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
  })

  sagaMiddleware.run(rootSaga)

  return store
}
