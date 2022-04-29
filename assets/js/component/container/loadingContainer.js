const LoadingContainer = {
    template: `
        <div 
            id="loading-container" 
            :ref="el => element = el"
            :style="style"
        >
            <div></div>
        </div>
    `,
    setup(){
        const {ref, computed, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const element = ref()
        const style = ref({display: 'none', opacity: '0'})
        const songs = computed(() => store.getters['playlist/getSongs'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const showing = computed(() => store.getters['loading/getShowing'])
        const playlistShowing = computed(() => store.getters['playlist/getShowing'])
        const playing = computed(() => store.getters['playlist/getPlaying'])
        const ease = BezierEasing(0.25, 0.1, 0.25, 0.1)

        const afterLoading = () => {
            songs.value.playAudio(crtKey.value, 0)
        }

        const show = () => {
            const start = {opacity: 0}
            const end = {opacity: 1}

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .easing(ease)
            .onStart(() => onStartTween())
            .onUpdate(() => onUpdateTween(start))

            return tw
        }

        const hide = () => {
            const start = {opacity: 1}
            const end = {opacity: 0}

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .easing(ease)
            .delay(600)
            .onComplete(() => onCompleteTween())
            .onUpdate(() => onUpdateTween(start))

            return tw
        }

        const onStartTween = () => {
            style.value.display = 'block'
        }

        const onUpdateTween = ({opacity}) => {
            style.value.opacity = opacity
        }

        const onCompleteTween = () => {
            style.value.display = 'none'
            afterLoading()
        }
        
        const start = () => {
            const showTw = show()
            const hideTw = hide()

            showTw.chain(hideTw)
            showTw.start()
        }

        watch(playing, (cur, pre) => {
            start()
        })

        return{
            element,
            style,
            showing,
            playing,
        }
    }
}