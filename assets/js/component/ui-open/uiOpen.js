import LogoDeemo from './logoDeemo.js'
import LogoHololive from './LogoHololive.js'

export default {
    components: {
        'logo-deemo': LogoDeemo,
        'logo-hololive': LogoHololive
    },
    template: `
        <div class="ui ui-open">

            <div class="open-logo-box">

                <logo-deemo />
                <logo-hololive />

            </div>
        
        </div>
    `,
    setup(){
        const store = Vuex.useStore()
        const style = Vue.reactive({
            logoBox: {},
        })
        const objAnim = Vue.computed(() => store.getters['open/getObjAnim'])

        Vue.watch(objAnim, (cur, pre) => {
            
        })

        return{
            style
        }
    }
}