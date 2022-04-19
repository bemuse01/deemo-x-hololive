export default {
    namespaced: true,
    state: {
        showing: false,
        crtKey: 0
    },
    getters: {
        getShowing(state){
            return state.showing
        },
        getCrtKey(state){
            return state.crtKey
        }
    },
    mutations: {
        setShowing(state, value){
            state.showing = value
        },
        setCrtKey(state, value){
            state.crtKey = value
        }
    },
    actions: {
        setShowing({commit}, value){
            commit('setShowing', value)
        },
        setCrtKey({commit}, value){
            commit('setCrtKey', value)
        }
    }
}