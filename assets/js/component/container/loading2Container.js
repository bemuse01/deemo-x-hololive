export default {
    template: `
        <div id="loading2-container">
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
        const {ref, onMounted, onUnmounted} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()


        // variable
        const len = 5
        const lists = ref(Array.from({length: len}, (_, key) => {

            const nlen = len - 1
            const light = 85 / nlen * (nlen - key)

            const style = {
                background: `hsl(0, 0%, ${light}%)`,
                left: '0',
                transform: 'translate(-105%, -50%) rotate(0deg)'
            }

            return {key, style}
        }))
        const isTweenDone = ref(false)


        // method
        const initTween = () => {
            lists.value.forEach(item => {
                createTween(item)
            })
        }
        const createTween = (item) => {
            const {key, style} = item
            const idx = (len - 1) - key

            const start = {left: 0, x: -100, rotate: 0}
            const end = {left: 105, x: 0, rotate: 180}

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
            if(idx === len - 1 && isTweenDone.value){
                initTween()
            }
        }
        const stopTween = () => {
            isTweenDone.value = true
        }
        const playOpening = () => {
            store.dispatch('open/setCanPlay', true)
        }


        // hook
        onUnmounted(() => {
            stopTween()
            playOpening()
        })

        onMounted(() => {
            initTween()
        })


        return {
            lists,
        }
    }
}