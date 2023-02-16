export default {
    namespaced: true,
    state: {
        player: {},
        currentIdx: 0,
        isPlayButtonClicked: false,
        isAudioPlaying: false,
        visualizerType: 0
    },
    getters: {
        getPlayer: (state) => state.player,
        getCurrentIdx: (state) => state.currentIdx,
        getIsPlayButtonClicked: (state) => state.isPlayButtonClicked,
        getIsAudioPlaying: (state) => state.isAudioPlaying,
        getVisualizerType: (state) => state.visualizerType
    },
    mutations: {
        setPlayer(state, value){
            state.player = value
        },
        setCurrentIdx(state, value){
            state.currentIdx = value
        },
        setIsPlayButtonClicked(state, value){
            state.isPlayButtonClicked = value
        },
        setIsAudioPlaying(state, value){
            state.isAudioPlaying = value
        },
        setVisualizerType(state, value){
            state.visualizerType = value
        }
    },
    actions: {
        setPlayer({commit}, value){
            commit('setPlayer', value)
        },
        setCurrentIdx({commit}, value){
            commit('setCurrentIdx', value)
        },
        setIsPlayButtonClicked({commit}, value){
            commit('setIsPlayButtonClicked', value)
        },
        setIsAudioPlaying({commit}, value){
            commit('setIsAudioPlaying', value)
        },
        setVisualizerType({commit}, value){
            commit('setVisualizerType', value)
        }
    },
}