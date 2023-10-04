export default {
    SET_CANDLES_DATA(state, data) {
        state.candles = data;
    },

    SET_ACCOUNTS_TRADES(state, data) {
        state.accountTrades = data;
    },

    SET_MARKET(state, data) {
        state.market = data;
    },

    SET_MARKET_TRADES(state, data) {
        state.marketTrades = data;
    },
}