import Open from '../class/openObj/open.js'

export default {
    template: `
        <div class="ui ui-open">
        
            <div class="ui-object-container open-object-container">
                <div class="open-object"></div>
            </div>
        
        </div>
    `,
    setup(){
        const store = Vuex.useStore()
        const open = Vue.ref()

        Vue.nextTick(() => {
            open.value = new Open(store.getters.getApp)
        })
    }
}