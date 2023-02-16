import {playlist} from '../../../data/data.js'

export default {
    template: `
        <div 
            class="visualizer-progress"
            :style="rootStyle"
            :ref="el => root = el"
        >
            <div 
                class="progress-box" 
                :style="boxStyle"
                @mouseenter="onMouseenter"
                @mouseleave="onMouseleave"
                @mousemove="onMousemove"
                @click="onClick"
            >

                <div 
                    class="progress-transform"
                    :style="transformStyle"
                >

                    <div
                        class="track-bar"
                        :style="trackStyle"
                    ></div>

                    <div 
                        class="progress-bar"
                        :style="progressStyle"
                    ></div>

                </div>

            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted, onUnmounted, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const player = computed(() => store.getters['player/getPlayer'])
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const hexcolor = computed(() => playlist[currentIdx.value].color.toString(16))


        // variable
        const root = ref()
        const animation = ref()


        // style
        const rootStyle = ref({
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '60px'
        })
        const boxStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%'
        })
        const transformStyle = ref({
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '3px',
            transform: 'scaleY(1)',
            transformOrigin: 'bottom',
            transition: 'transform 0.3s'
        })
        const progressStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `#${hexcolor.value}`,
            transform: 'scaleX(0)',
            transformOrigin: 'left'
        })
        const trackStyle = ref({
            position: 'absolute',
            width: '0',
            height: '100%',
            background: `#${hexcolor.value}80`,
            transition: 'opacity 0.3s'
        })


        // method
        const onClick = (e) => {
            if(!root.value) return

            const {width} = root.value.getBoundingClientRect()
            const currentX = e.clientX
            const ratio = currentX / width

            player.value.setCurrentTime(currentIdx.value, ratio)
        }
        const onMousemove = (e) => {
            const width = e.clientX
            
            trackStyle.value.width = `${width}px`
        }
        const onMouseenter = () => {
            transformStyle.value.transform = 'scaleY(5)'
            trackStyle.value.opacity = '1'
        }
        const onMouseleave = () => {
            transformStyle.value.transform = 'scaleY(1)'
            trackStyle.value.opacity = '0'
        }
        const setProgress = () => {
            const progress = player.value.getProgress(currentIdx.value)
            progressStyle.value.transform = `scaleX(${progress})`
        }
        const animate = () => {
            if(!player.value) return

            setProgress()

            animation.value = requestAnimationFrame(() => animate())
        }
        const cancelAnimate = () => {
            cancelAnimationFrame(animation.value)
        }


        // hook
        onMounted(() => {
            animate()
        })
        onUnmounted(() => {
            cancelAnimate()
        })


        return{
            root,
            rootStyle,
            boxStyle,
            progressStyle,
            transformStyle,
            trackStyle,
            onMouseenter,
            onMouseleave,
            onMousemove,
            onClick
        }
    }
}