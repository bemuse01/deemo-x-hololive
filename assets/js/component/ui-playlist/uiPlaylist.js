// import BgContainer from '../public/bgContainer.js'
import BgContainer from './bgContainer.js'
import NavContainer from './navContainer.js'

export default {
    components: {
        'bg-container': BgContainer,
        'nav-container': NavContainer,
    },
    template: `
        <div 
            class="ui ui-playlist" 
            :style="style.root"
            :ref="el => root = el"
        >

            <bg-container></bg-container>
            <nav-container></nav-container>

        </div>
    `,
    setup(){
        const {ref, reactive, watchEffect, onMounted, computed, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const root = ref()
        const showing = computed(() => store.getters['playlist/getShowing'])
        const playing = computed(() => store.getters['playlist/getPlayling'])
        const style = reactive({
            root: {opacity: '0'}
        })

        const show = () => {
            style.root.opacity = '1'
            store.dispatch('playlist/setShowing', true)
        }

        const hide = () => {
            style.root.opacity = '0'
            store.dispatch('playlist/setShowing', false)
        }

        const emitHideLoading = () => {
            store.dispatch('loading/setShowing', false)
        }

        const emitPlaySong = () => {
            store.dispatch('playlist/setPlaying', true)
        }

        // const onTransitionend = () => {
        //     store.dispatch('open/setShowing', false)
        //     if(showing.value === false){
        //         emitHideLoading()
        //         emitPlaySong()
        //     }
        // }

        // onMounted(() => {
        //     root.value.addEventListener('transitionend', onTransitionend)
        // })

        watchEffect(() => {
            if(store.getters['open/getAnim'].hololive){
                show()
            }
        })

        // watch(showing, (cur, pre) => {
        //     if(cur === false) hide()
        // })

        watch(playing, (cur, pre) => {
            if(cur) hide()
            else show()
        })

        return{
            root,
            style
        }
    }
}