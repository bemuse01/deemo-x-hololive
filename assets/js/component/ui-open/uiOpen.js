import LogoDeemo from './logoDeemo.js'
import LogoHololive from './LogoHololive.js'
import BgContainer from '../public/bgContainer.js'
import Overlay from './overlay.js'

export default {
    components: {
        'logo-deemo': LogoDeemo,
        'logo-hololive': LogoHololive,
        'overlay': Overlay,
        'bg-container': BgContainer
    },
    template: `
        <div class="ui ui-open">

            <div class="open-logo-box">

                <logo-deemo />
                <logo-hololive />
                <overlay />

            </div>
        
        </div>
    `,
    setup(){
        const {watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()

        watchEffect(() => {
            if(store.getters['open/getAnim'].overlay){
                store.dispatch('open/setShowing', false)
            }
        })
    }
}