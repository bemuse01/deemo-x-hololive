import Open from '../class/openObj/open.js'

export default {
    template: `
        <div class="ui ui-open">

            <div class="open-logo-box">
        
                <div 
                    class="ui-object-container open-deemo-container"
                    :style="style.deemoContainer"
                >
                    <div></div>
                </div>

                <div 
                    class="ui-el-container open-hololive-container"
                    :style="style.hololiveContainer"
                >
                    <img src="./assets/src/hololive.png">
                </div>

            </div>
        
        </div>
    `,
    setup(){
        const store = Vuex.useStore()
        const open = Vue.ref()
        const style = Vue.reactive({
            logoBox: {},
            deemoContainer: {right: '50%', transform: 'translate(50%, -50%)'},
            hololiveContainer: {opacity: 0, transform: 'translate(0, 100%)'}
        })
        const objAnim = Vue.computed(() => store.getters['open/getObjAnim'])

        const show = () => {

        }

        const hide = () => {
            
        }

        Vue.watch(objAnim, (cur, pre) => {
            console.log(cur)
        })

        Vue.nextTick(() => {
            open.value = new Open(store)
        })

        return{
            style
        }
    }
}