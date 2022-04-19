// import BgContainer from '../public/bgContainer.js'
import BgContainer from './bgContainer.js'
import NavContainer from './navContainer.js'

export default {
    components: {
        'bg-container': BgContainer,
        'nav-container': NavContainer
    },
    template: `
        <div 
            class="ui ui-playlist" 
            :style="style.root"
            :ref="el => root = el"
        >

            <bg-container class="playlist-bg-container"></bg-container>
            <nav-container></nav-container>

        </div>
    `,
    setup(){
        const {ref, reactive, watchEffect, onMounted} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const root = ref()
        const style = reactive({
            root: {opacity: '0'}
        })

        const show = () => {
            style.root.opacity = '1'
        }

        const onTransitionend = () => {
            store.dispatch('open/setShowing', false)
        }

        onMounted(() => {
            root.value.addEventListener('transitionend', onTransitionend)
        })

        watchEffect(() => {
            if(store.getters['open/getAnim'].hololive){
                show()
            }
        })

        return{
            root,
            style
        }
    }
}