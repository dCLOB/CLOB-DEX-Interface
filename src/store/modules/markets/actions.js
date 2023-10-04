export default {
    getMarkets({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/markets`,).then((res) => {
                commit('SET_MARKET', res);
                resolve(res);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    getMarketsTrades({ commit }, { market_id, params}) {
        return new Promise((resolve, reject) => {
          $axios.get(`/markets/${market_id}/trades`, { params }).then((res) => {
            commit('SET_MARKET_TRADES', res);
            resolve(res);
          })
            .catch((err) => {
              reject(err);
            });
        });
      },

    getAccountTrades({commit}, {market_id}) {
      return new Promise((resolve, reject) => {
        $axios.get(`/markets/${market_id}/trades/mine`).then((res) => {
          commit('SET_ACCOUNTS_TRADES', res);
          resolve(res);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getMarketsCandles({commit}, {market_id, params}) {
      return new Promise((resolve, reject) => {
        $axios.get(`/markets/${market_id}/candles`, { params }).then(({data}) => {
          commit('SET_CANDLES_DATA', data);
          resolve(data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getOrderBook({ commit }, {market_id, size}) {
        return new Promise((resolve, reject) => {
            $axios.get(`/markets/${market_id}/orderbook?per_page=${size}`).then((res) => {
                // commit('SET_ORDERS_DATA', res.data);
                resolve(res.data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    },
}