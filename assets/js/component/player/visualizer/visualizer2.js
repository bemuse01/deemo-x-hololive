import {playlist} from '../../../data/data.js'
import {Visualizer2} from '../../../class/visualizer2/visualizer.js'

export default {
    template: `
        <div class="visualizer-2" :style="visualizerStyle">
            <canvas 
                :ref="el => canvas = el" 
                :style="canvasStyle"
            />
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
        const hexColor = computed(() => playlist[currentIdx.value].color.toString(16))
        const logoPath = computed(() => playlist[currentIdx.value].logoPath)


        // variable
        const canvas = ref()
        const radius = 30
        const color = 0xffffff
        let visualizer = null


        // style
        const visualizerStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%'
        })
        const canvasStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%',
            filter: `
                drop-shadow(0 0 2px #${hexColor.value}) 
                drop-shadow(0 0 2px #${hexColor.value}) 
                brightness(1.5)
            `
        })


        // method
        const createObject = () => {
            visualizer = new Visualizer2({app: app.value, audio: player.value, color, canvas: canvas.value, radius, logoPath: logoPath.value})
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