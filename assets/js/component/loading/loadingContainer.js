export default {
    props: {
        isResourceLoaded: Boolean
    },
    template: `
        <div 
            id="loading-container"
            :style="containerStyle"
        >
            <div 
                :style="boxStyle"
            >

                <div
                    v-for="i in lists"
                    :key="i.key"
                    :style="i.style"
                >
                </div>

            </div>
            
        </div>
    `,
    setup(props){
        const {ref, onMounted, onUnmounted, getCurrentInstance, toRefs} = Vue
        const {useStore} = Vuex
        const {emit} = getCurrentInstance()


        // props
        const {isResourceLoaded} = toRefs(props)


        // variable
        const len = 5
        const lists = ref(Array.from({length: len}, (_, key) => {

            const nlen = len - 1
            const light = 85 / nlen * (nlen - key)

            const style = {
                position: 'absolute',
                top: '50%',
                width: '30px',
                height: '30px',
                background: `hsl(0, 0%, ${light}%)`,
                transform: 'translate(-105%, -50%) rotate(0deg)'
            }

            return {key, style}
        }))
        const isTweenDone = ref(false)


        // style
        const containerStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%'
        })
        const boxStyle = ref({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            overflow: 'hidden'
        })


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
        const stopTween = () => {
            emit('loadingTweenDone')
        }
        const onUpdateTween = (style, {left, x, rotate}) => {
            style.left = `${left}%`
            style.transform = `translate(${x}%, -50%) rotate(${rotate}deg)`
        }
        const onCompleteTween = (idx) => {
            if(idx === len - 1 && !isResourceLoaded.value){
                initTween()
            }else if(idx === len - 1 && isResourceLoaded.value) {
                stopTween()
            }
        }



        // hook
        onMounted(() => {
            initTween()
        })
        onUnmounted(() => {
            // stopTween()
        })


        return {
            containerStyle,
            boxStyle,
            lists
        }
    }
}