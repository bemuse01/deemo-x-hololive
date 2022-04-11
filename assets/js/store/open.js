export default {
    namespaced: true,
    state: {
        objAnimDone: false,
        elAnimDone: false
    },
    getters: {
        getObjAnim(state){
            return state.objAnimDone
        },
        getElAnim(state){
            return state.elAnimDone
        }
    },
    mutations: {
        setObjAnim(state, value){
            state.openObjAnimDone = value
        },
        setElAnim(state, value){
            state.openElAnimDone = value
        }
    },
    actions: {
        setObjAnim({commit}, value){
            commit('setObjAnim', value)
        },
        setElAnim({commit}, value){
            commit('setElAnim', value)
        }
    }
}