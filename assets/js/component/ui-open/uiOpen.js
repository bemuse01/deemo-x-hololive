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
        const {reactive, ref, watchEffect, watch, computed, onUnmounted, nextTick} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const style = reactive({
            logoBox: {},
        })
        const objAnim = computed(() => store.getters['open/getDeemoAnim'])

        watch(objAnim, (cur, pre) => {
            console.log(cur)
        })

        return{
            style
        }
    }
}