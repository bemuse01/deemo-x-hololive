import OpenStore from './open.js'
import PlaylistStore from './playlist.js'
import LoadingStore from './loading.js'

export default Vuex.createStore({
    state: {
        app: null,
    },
    getters: {
        getApp: (state) => state.app,
    },
    mutations: {
        setApp(state, newApp){
            state.app = newApp
        },
    },
    actions: {
        setApp({commit}, newApp){
            commit('setApp', newApp)
        },
    },
    modules: {
        open: OpenStore,
        playlist: PlaylistStore,
        loading: LoadingStore
    }
})