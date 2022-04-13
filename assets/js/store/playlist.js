export default {
    namespaced: true,
    state: {
        showing: false,
    },
    getters: {
        getShowing(state){
            return state.showing
        },
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