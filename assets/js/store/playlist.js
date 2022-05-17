import Songs from '../data/songs.js'
import songs from '../class/audio/songs.js'

export default {
    namespaced: true,
    state: {
        showing: false,
        crtKey: 0,
        songs: new songs(Songs),
        durations: [],
        playing: false,
        srcLoaded: false,
    },
    getters: {
        getShowing: (state) => state.showing,
        getCrtKey: (state) => state.crtKey,
        getSong: (state) => (idx) => state.songs.getSong(idx),
        getSongs: (state) => state.songs,
        getPlaying: (state) => state.playing,
        getSrcLoaded: (state) => state.srcLoaded
    },
    mutations: {
        setShowing(state, value){
            state.showing = value
        },
        setCrtKey(state, value){
            state.crtKey = value
        },
        setPlaying(state, value){
            state.playing = value
        },
        setSrcLoaded(state, value){
            state.srcLoaded = value
        }
    },
    actions: {
        setShowing({commit}, value){
            commit('setShowing', value)
        },
        setCrtKey({commit}, value){
            commit('setCrtKey', value)
        },
        setPlaying({commit}, value){
            commit('setPlaying', value)
        },
        setSrcLoaded({commit}, value){
            commit('setSrcLoaded', value)
        }
    }
}