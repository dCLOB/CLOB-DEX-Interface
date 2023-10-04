import instance from './instance'


import tradingModule from './trading-api'

export default {
  trading: tradingModule(instance)
}
