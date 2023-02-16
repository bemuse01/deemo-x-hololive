import {Visualizer1} from '../../../class/visualizer1/visualizer.js'
import {Particle} from '../../../class/particle/particle.js'
import {playlist} from '../../../data/data.js'

export default {
    template: `
        <div class="visualizer-1" :style="visualizerStyle">
            <canvas :ref="el => canvas = el" :style="canvasStyle" />
            <div :style="logoStyle">
                <div :style="logoImgStyle"></div>
            </div>
        </div>
    `,
    setup(){
        const {onMounted, computed, onUnmounted, ref} = Vue
        const {useStore} = Vuex


        // stroe
        const store = useStore()
        const app = computed(() => store.getters['app/getApp'])
        const player = computed(() => store.getters['player/getPlayer'])
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const color = computed(() => playlist[currentIdx.value].color)
        const logoPath = computed(() => playlist[currentIdx.value].logoPath)


        // variable
        const canvas = ref()
        const radius = 17
        const visualizerScale = 0.5
        const animation = ref()
        let visualizer = null
        let particle = null


        // style
        const scale = ref(1)
        const visualizerStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%',
        })
        const canvasStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%',
        })
        const logoStyle = ref({
            position: 'absolute',
            width: '17vh',
            height: '17vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        })
        const logoImgStyle = computed(() => ({
            width: '100%',
            height: '100%',
            transform: `scale(${scale.value})`, 
            background: `url('${logoPath.value}') no-repeat center center / cover`
        }))


        // method
        const createObject = () => {
            particle = new Particle({app: app.value, audio: player.value, color: color.value, canvas: canvas.value})
            visualizer = new Visualizer1({app: app.value, audio: player.value, color: color.value, canvas: canvas.value, radius, scale: visualizerScale})
        }
        const disposeObject = () => {
            visualizer.dispose()
            particle.dispose()
            visualizer = null
            particle = null
        }
        const animate = () => {
            if(player.value.audioDataAvg){
                scale.value = 1 + player.value.audioDataAvg * visualizerScale
            }

            animation.value = requestAnimationFrame(() => animate())
        }
        const cancelAnimate = () => {
            cancelAnimationFrame(animation.value)
        }


        // hook
        onMounted(() => {
            createObject()
            animate()
        })
        onUnmounted(() => {
            disposeObject()
            cancelAnimate()
        })


        return{
            canvas,
            visualizerStyle,
            canvasStyle,
            logoStyle,
            logoImgStyle
        }
    }
}