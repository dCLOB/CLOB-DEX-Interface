export default {
    getOrders({ commit }, params) {
        return new Promise((resolve, reject) => {
          $axios.get('/orders', {params}).then((res) => {
            // commit('SET_ORDERS_DATA', res.data);
            resolve(res.data);
          })
            .catch((err) => {
              reject(err);
            });
        });
      },

    getOrdersInfo({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get('/orders/info?market_id=TSLA-USDC').then((res) => {
                // commit('SET_ORDERS_DATA', res.data);
                resolve(res.data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    deleteOrderById({commit}, orderId) {
      return new Promise((resolve, reject) => {
        $axios.delete(`/orders/${orderId}`).then((res) => {
          // commit('SET_ORDERS_DATA', res.data);
          resolve(res.data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    },
  };