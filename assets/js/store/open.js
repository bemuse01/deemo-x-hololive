const OpenStore = {
    namespaced: true,
    state: {
        showing: true,
        anim: {
            deemo: false,
            hololive: false,
            overlay: false
        }
    },
    getters: {
        getShowing(state){
            return state.showing
        },
        getAnim(state){
            return state.anim
        }
    },
    mutations: {
        setShowing(state, value){
            state.showing = value
        },
        setAnim(state, {name, value}){
            state.anim[name] = value
        }
    },
    actions: {
        setShowing({commit}, value){
            commit('setShowing', value)
        },
        setAnim({commit}, param){
            commit('setAnim', param)
        }
    }
}