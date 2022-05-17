export default {
    namespaced: true,
    state: {
        showing: true,
        anim: {
            deemo: false,
            hololive: false,
            overlay: false
        },
        canPlay: false
    },
    getters: {
        getShowing: (state) => state.showing,
        getAnim: (state) => state.anim,
        getCanPlay: (state) => state.canPlay
    },
    mutations: {
        setShowing(state, value){
            state.showing = value
        },
        setAnim(state, {name, value}){
            state.anim[name] = value
        },
        setCanPlay(state, value){
            state.canPlay = value
        }
    },
    actions: {
        setShowing({commit}, value){
            commit('setShowing', value)
        },
        setAnim({commit}, param){
            commit('setAnim', param)
        },
        setCanPlay({commit}, value){
            commit('setCanPlay', value)
        }
    }
}