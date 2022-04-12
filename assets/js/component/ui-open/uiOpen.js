import LogoDeemo from './logoDeemo.js'
import LogoHololive from './LogoHololive.js'
import Overlay from './overlay.js'

export default {
    components: {
        'logo-deemo': LogoDeemo,
        'logo-hololive': LogoHololive,
        'overlay': Overlay
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
            if(store.getters['open/getOverlayAnim']){
                store.dispatch('open/setShowing', false)
            }
        })
    }
}