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
            :style="style"
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
        const playing = computed(() => store.getters['playlist/getPlaying'])
        const hololive = computed(() => store.getters['open/getAnim'].hololive)
        const style = ref({display: 'none', opacity: '0'})
        const ease = BezierEasing(0.25, 0.1, 0.25, 0.1)
        const loadingDelay = store.getters['loading/getLoadingDelay']

        const show = (delay = 0, cbs) => {
            const start = {opacity: 0}
            const end = {opacity: 1}

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .delay(delay)
            .easing(ease)
            .onStart(() => onStartTween())
            .onUpdate(() => onUpdateTween(start))
            .start()

            for(const cb in cbs) tw[cb](() => cbs[cb]())
        }

        const hide = (delay) => {
            const start = {opacity: 1}
            const end = {opacity: 0}

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .easing(ease)
            .delay(delay)
            .onComplete(() => onCompleteTween())
            .onUpdate(() => onUpdateTween(start))
            .start()
        }

        const onStartTween = () => {
            style.value.display = 'block'
        }

        const onUpdateTween = ({opacity}) => {
            style.value.opacity = opacity
        }

        const onCompleteTween = () => {
            style.value.display = 'none'
        }

        const emitHideOpen = () => {
            store.dispatch('open/setShowing', false)
        }

        watch(hololive, (cur, pre) => {
            if(cur) show(0, {onComplete: emitHideOpen})
        })

        watch(playing, (cur, pre) => {
            if(cur) hide(loadingDelay)
            else show(loadingDelay)
        })

        return{
            style
        }
    }
}