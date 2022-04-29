export default {
    namespaced: true,
    state: {
        isPlaying: false
    },
    getters: {
        getIsPlaying: (state) => state.isPlaying 
    },
    mutations: {
        setIsPlaying(state, value){
            state.isPlaying = value
        },
    },
    actions: {
        setIsPlaying({commit}, value){
            commit('setIsPlaying', value)
        },
    }
}