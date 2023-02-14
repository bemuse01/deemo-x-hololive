import {Visualizer1} from '../../class/visualizer1/visualizer.js'
import {Particle} from '../../class/particle/particle.js'

export default {
    template: `
        <div class="ui-container visualizer-container visualizer-v1-container">
            <canvas :ref="el => canvas = el" />
            <div class="v-logo v1-logo">
                <div :style="style"></div>
            </div>
        </div>
    `,
    setup(){
        const {onMounted, computed, onBeforeUnmount, ref} = Vue
        const {useStore} = Vuex

        const store = useStore()
        let visualizer = null
        let particle = null

        const app = computed(() => store.getters['getApp'])
        const audio = computed(() => store.getters['playlist/getPlayer'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const scale = ref(1)
        const style = computed(() => ({
            transform: `scale(${scale.value})`, 
            background: `url('${crtItem.value.logoPath}') no-repeat center center / cover`
        }))

        const canvas = ref()
        const radius = 17
        const sc = 0.5
        const color = crtItem.value.color
        const animation = ref()

        const animate = () => {
            if(audio.value.audioDataAvg){
                scale.value = 1 + audio.value.audioDataAvg * sc
            }

            animation.value = requestAnimationFrame(() => animate())
        }

        onMounted(() => {
            particle = new Particle({app: app.value, audio: audio.value, color, canvas: canvas.value})
            visualizer = new Visualizer1({app: app.value, audio: audio.value, color, canvas: canvas.value, radius, scale: sc})

            animate()
        })

        onBeforeUnmount(() => {
            visualizer.dispose()
            particle.dispose()
            visualizer = null
            particle = null
            cancelAnimationFrame(animation.value)
            console.log(app.value.renderer.info)
        })

        return{
            canvas,
            style
        }
    }
}