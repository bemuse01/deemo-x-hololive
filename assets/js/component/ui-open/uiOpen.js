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
        <div class="ui ui-open">

            <div class="open-logo-box">

                <logo-deemo />
                <logo-hololive />

            </div>
        
        </div>
    `,
    setup(){
        const {watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()

        watchEffect(() => {
            if(store.getters['open/getAnim'].hololive){
                // store.dispatch('open/setShowing', false)
            }
        })
    }
}