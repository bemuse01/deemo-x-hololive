import LogoDeemo from './logoDeemo.js'
import LogoHololive from './logoHolo.js'
import BgContainer from '../public/bgContainer.js'

export default {
    components: {
        'logo-deemo': LogoDeemo,
        'logo-hololive': LogoHololive,
        'bg-container': BgContainer
    },
    template: `
        <transition name="fade">
            <div class="ui ui-open" v-if="showing">

                <div class="open-logo-box">

                    <logo-deemo />
                    <logo-hololive />

                </div>
            
            </div>
        </transition>
    `,
    setup(){
        const {computed, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const showing = computed(() => store.getters['open/getShowing'])
        const anims = computed(() => store.getters['open/getAnim'])

        const hide = () => {
            store.dispatch('open/setShowing', false)
        }

        watchEffect(() => {
            for(const anim in anims.value){
                if(!anims.value[anim]) return
            }

            hide()
        })

        return{
            showing
        }
    }
}