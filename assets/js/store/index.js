import OpenStore from './open.js'
import PlaylistStore from './playlist.js'
import LoadingStore from './loading.js'

export default Vuex.createStore({
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
    modules: {
        open: OpenStore,
        playlist: PlaylistStore,
        loading: LoadingStore
    }
})