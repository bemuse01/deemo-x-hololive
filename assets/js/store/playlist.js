import Songs from '../data/data.js'
import Player from '../class/audio/player.js'

export default {
    namespaced: true,
    state: {
        showing: true,
        crtKey: 0,
        player: new Player(Songs),
        durations: [],
        playing: false,
        srcLoaded: false,
    },
    getters: {
        getShowing: (state) => state.showing,
        getCrtKey: (state) => state.crtKey,
        getSong: (state) => (idx) => state.player.getSong(idx),
        getPlayer: (state) => state.player,
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