export default {
    namespaced: true,
    state: {
        showing: true,
        deemoAnim: false,
        hololiveAnim: false,
        overlayAnim: false,
    },
    getters: {
        getShowing(state){
            return state.showing
        },
        getDeemoAnim(state){
            return state.deemoAnim
        },
        getHololiveAnim(state){
            return state.hololiveAnim
        },
        getOverlayAnim(state){
            return state.overlayAnim
        }
    },
    mutations: {
        setShowing(state, value){
            state.showing = value
        },
        setDeemoAnim(state, value){
            state.deemoAnim = value
        },
        setHololiveAnim(state, value){
            state.hololiveAnim = value
        },
        setOverlayAnim(state, value){
            state.overlayAnim = value
        }
    },
    actions: {
        setShowing({commit}, value){
            commit('setShowing', value)
        },
        setDeemoAnim({commit}, value){
            commit('setDeemoAnim', value)
        },
        setHololiveAnim({commit}, value){
            commit('setHololiveAnim', value)
        },
        setOverlayAnim({commit}, value){
            commit('setOverlayAnim', value)
        }
    }
}