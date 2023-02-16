export default {
    namespaced: true,
    state: {
        audios: [],
        bgs: [],
        logos: [],
        uis: [],
    },
    getters: {
        getAudios: (state) => state.audios,
        getUis: (state) => state.uis,
        getUiByName: (state) => (name) => state.uis.find(item => item.name === name),
        getBgs: (state) => state.bgs,
        getLogos: (state) => state.logos
    },
    mutations: {
        setAudios(state, value){
            state.audios = value
        },
        setUis(state, value){
            state.uis = value
        },
        setBgs(state, value){
            state.bgs = value
        },
        setLogos(state, value){
            state.logos = value
        }
    },
    actions: {
        setAudios({commit}, value){
            commit('setAudios', value)
        },
        setUis({commit}, value){
            commit('setUis', value)
        },
        setBgs({commit}, value){
            commit('setBgs', value)
        },
        setLogos({commit}, value){
            commit('setLogos', value)
        },
    },
}