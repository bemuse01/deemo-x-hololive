import Songs from '../data/songs.js'

export default {
    namespaced: true,
    state: {
        showing: false,
        crtKey: 0,
        songs: [...Songs],
        durations: [],
        playing: false
    },
    getters: {
        getShowing: (state) => state.showing,
        getCrtKey: (state) => state.crtKey,
        getSong: (state) => (idx) => state.songs[idx],
        getSongs: (state) => state.songs,
        getPlaying: (state) => state.playing
    },
    mutations: {
        setShowing(state, value){
            state.showing = value
        },
        setCrtKey(state, value){
            state.crtKey = value
        },
        setSong(state, {idx, value}){
            state.songs[idx] = value
        },
        setSongByKey(state, {idx, key, value}){
            state.songs[idx][key] = value
        },
        setPlaying(state, value){
            state.playing = value
        }
    },
    actions: {
        setShowing({commit}, value){
            commit('setShowing', value)
        },
        setCrtKey({commit}, value){
            commit('setCrtKey', value)
        },
        setDuration({commit}, {idx, value}){
            commit('setDuration', {idx, value})
        },
        setSong({commit}, {idx, value}){
            commit('setSong', {idx, value})
        },
        setSongByKey({commit}, {idx, key, value}){
            commit('setSongByKey', {idx, key, value})
        },
        setPlaying({commit}, value){
            commit('setPlayling', value)
        }
    }
}