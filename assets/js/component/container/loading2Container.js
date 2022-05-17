export default {
    template: `
        <div id="loading2-container" v-if="showing">
            <div class="loading-box">
                <div
                    class="loading-item"
                    v-for="i in lists"
                    :key="i.key"
                    :style="i.style"
                >
                </div>
            </div>
        </div>
    `,
    setup(){
        const {ref, onMounted, computed, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const srcLoaded = computed(() => store.getters['playlist/getSrcLoaded'])
        const len = 5
        const lists = ref(Array.from({length: len}, (_, key) => {

            const nlen = len - 1
            const light = 85 / nlen * (nlen - key)

            const style = {
                background: `hsl(0, 0%, ${light}%)`,
                left: '0',
                transform: 'translate(-100%, -50%) rotate(0deg)'
            }

            return {key, style}
        }))
        const isTweenDone = ref(false)
        const showing = ref(true)

        const initTween = () => {
            lists.value.forEach(item => {
                createTween(item)
            })
        }

        const createTween = (item) => {
            const {key, style} = item
            const idx = (len - 1) - key

            const start = {left: 0, x: -100, rotate: 0}
            const end = {left: 100, x: 0, rotate: 180}

            const tw = new TWEEN.Tween(start)
            .to(end, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .delay(idx * 80 + 750)
            .onUpdate(() => onUpdateTween(style, start))
            .onComplete(() => onCompleteTween(idx))
            .start()
        }

        const onUpdateTween = (style, {left, x, rotate}) => {
            style.left = `${left}%`
            style.transform = `translate(${x}%, -50%) rotate(${rotate}deg)`
        }

        const onCompleteTween = (idx) => {
            if(idx === len - 1 && srcLoaded.value === false){
                initTween()
            }else if(idx === len - 1 && srcLoaded.value){
                isTweenDone.value = true
            }
        }

        const playOpening = () => {
            store.dispatch('open/setCanPlay', true)
            showing.value = false
        }

        watchEffect(() => {
            if(isTweenDone.value && srcLoaded.value){
                // should be modified
                // not working without setTimeout
                setTimeout(() => playOpening(), 0)
            }
        })

        onMounted(() => {
            initTween()
        })

        return {
            lists,
            showing
        }
    }
}