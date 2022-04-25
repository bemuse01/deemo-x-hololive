import OpenStore from './open.js'
import PlaylistStore from './playlist.js'
import LoadingStore from './loading.js'

export default Vuex.createStore({
    state: {
        app: null,
        audio: null
    },
    getters: {
        getApp: (state) => state.app,
        getAudio: (state) => state.audio
    },
    mutations: {
        setApp(state, newApp){
            state.app = newApp
        },
        setAudio(state, newAudio){
            state.audio = newAudio
        }
    },
    actions: {
        setApp({commit}, newApp){
            commit('setApp', newApp)
        },
        setAudio({commit}, newAudio){
            commit('setAudio', newAudio)
        }
    },
    modules: {
        open: OpenStore,
        playlist: PlaylistStore,
        loading: LoadingStore
    }
})