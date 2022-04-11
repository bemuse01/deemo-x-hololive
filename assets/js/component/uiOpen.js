import Open from '../class/openObj/open.js'

export default {
    template: `
        <div class="ui ui-open">

            <div class="open-logo-box">
        
                <div class="ui-object-container open-deemo-container">
                    <div></div>
                </div>

                <div class="ui-el-container open-hololive-container">
                    <img src="./assets/src/hololive.png">
                </div>

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