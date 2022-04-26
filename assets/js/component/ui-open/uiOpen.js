import LogoDeemo from './logoDeemo.js'
import LogoHololive from './LogoHololive.js'
import BgContainer from '../public/bgContainer.js'

export default {
    components: {
        'logo-deemo': LogoDeemo,
        'logo-hololive': LogoHololive,
        'bg-container': BgContainer
    },
    template: `
        <div class="ui ui-open" v-if="showing">

            <div class="open-logo-box">

                <logo-deemo />
                <logo-hololive />

            </div>
        
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const showing = computed(() => store.getters['open/getShowing'])

        return{
            showing
        }
    }
}