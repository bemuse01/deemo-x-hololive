export default {
    namespaced: true,
    state: {
        app: null,
        scale: 1,
    },
    getters: {
        getApp: (state) => state.app,
        getScale: (state) => state.scale
    },
    mutations: {
        setApp(state, newApp){
            state.app = newApp
        },
        setScale(state, scale){
            state.scale = scale
        }
    },
    actions: {
        setApp({commit}, newApp){
            commit('setApp', newApp)
        },
        setScale({commit}, scale){
            commit('setScale', scale)
        }
    },
}