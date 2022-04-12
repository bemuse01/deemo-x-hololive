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
        const {watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()

        watchEffect(() => {
            if(store.getters['open/getDeemoAnim'] && store.getters['open/getHololiveAnim']){
                store.dispatch('open/setShowing', false)
            }
        })
    }
}