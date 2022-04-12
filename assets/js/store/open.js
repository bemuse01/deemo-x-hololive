export default {
    namespaced: true,
    state: {
        deemoAnim: false,
        hololiveAnim: false
    },
    getters: {
        getDeemoAnim(state){
            return state.deemoAnim
        },
        getHololiveAnim(state){
            return state.hololiveAnim
        }
    },
    mutations: {
        setDeemoAnim(state, value){
            state.deemoAnim = value
        },
        setHololiveAnim(state, value){
            state.hololiveAnim = value
        }
    },
    actions: {
        setDeemoAnim({commit}, value){
            commit('setDeemoAnim', value)
        },
        setHololiveAnim({commit}, value){
            commit('setHololiveAnim', value)
        }
    }
}