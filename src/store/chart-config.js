export const charts = {
    namespaced: true,
    state: {
        chartData: null
    },
    actions: {
        updateChartData(context, data) {
            context.commit('UPDATE_CHART_DATA', data);
        },
    },
    mutations: {
        UPDATE_CHART_DATA(state, val) {
            state.chartData = val;
        },
    },
    getters: {
        chartData(state) {
            return state.chartData
        }
    }
}
