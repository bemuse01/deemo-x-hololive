export default {
    namespaced: true,
    state: {
        showing: false,
        currentMusicKey: 0
    },
    getters: {
        getShowing(state){
            return state.showing
        },
        getCrtMusicKey(state){
            return state.currentMusicKey
        }
    },
    mutations: {
        setShowing(state, value){
            state.showing = value
        },
        setCrtMusicKey(state, value){
            state.currentMusicKey = value
        }
    },
    actions: {
        setShowing({commit}, value){
            commit('setShowing', value)
        },
        setCrtMusicKey({commit}, value){
            commit('setCrtMusicKey', value)
        }
    }
}