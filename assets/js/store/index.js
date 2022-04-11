import OpenStore from './open.js'

export default Vuex.createStore({
    state: {
        app: null
    },
    getters: {
        getApp(state){
            return state.app
        }
    },
    mutations: {
        setApp(state, newApp){
            state.app = newApp
        }
    },
    actions: {
        setApp({commit}, newApp){
            commit('setApp', newApp)
        }
    },
    modules: {
        open: OpenStore
    }
})