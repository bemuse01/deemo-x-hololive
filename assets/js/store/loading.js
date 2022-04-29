const LoadingStore = {
    namespaced: true,
    state: {
        showing: false,
        loadingDelay: 600
    },
    getters: {
        getShowing(state){
            return state.showing
        },
        getLoadingDelay: (state) => state.loadingDelay 
    },
    mutations: {
        setShowing(state, value){
            state.showing = value
        },
    },
    actions: {
        setShowing({commit}, value){
            commit('setShowing', value)
        },
    }
}