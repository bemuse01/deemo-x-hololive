import {playlist} from '../../../data/data.js'
import {Visualizer0} from '../../../class/visualizer0/visualizer.js'

export default {
    template: `
        <div 
            class="visualizer-0"
            :style="visualizerStyle"
        >
            <canvas :ref="el => canvas = el" :style="canvasStyle" />
        </div>
    `,
    setup(){
        const {ref, onMounted, computed, onUnmounted} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const app = computed(() => store.getters['app/getApp'])
        const player = computed(() => store.getters['player/getPlayer'])
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const color = computed(() => playlist[currentIdx.value].color)
        const logoPath = computed(() => playlist[currentIdx.value].logoPath)


        // variable
        const canvas = ref()
        const radius = 12
        let visualizer = null


        // style
        const visualizerStyle = computed(() => ({
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'black'
            // background: `url('${logoPath.value}') no-repeat center center / cover`
        }))
        const canvasStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%',
        })


        // method
        const createObject = () => {
            visualizer = new Visualizer0({app: app.value, audio: player.value, color: color.value, canvas: canvas.value, radius, logoPath: logoPath.value})
        }
        const disposeObject = () => {
            visualizer.dispose()
            visualizer = null
        }
 

        // hook
        onMounted(() => {
            createObject()
        })
        onUnmounted(() => {
            disposeObject()
        })


        return{
            canvas,
            visualizerStyle,
            canvasStyle
        }
    }
}