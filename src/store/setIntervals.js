export const intervals = {
    state: {
        amountInterval: null,
        current: null
    },
    getters: {
        getAmountInterval(state) {
            return state.amountInterval
        }
    },
    mutations: {
        SET_AMOUNT_INTERVAL(state, payload) {
            state.amountInterval = payload
        },
        DELETE_AMOUNT_INTERVAL(state, payload) {
            clearInterval(payload)
        }
    },
    actions: {
        setAmountInterval({ commit }, payload) {
            commit('SET_AMOUNT_INTERVAL', payload)
        },
        deleteAmountInterval({ commit }, payload) {
            commit('DELETE_AMOUNT_INTERVAL', payload)
        }
    }
}