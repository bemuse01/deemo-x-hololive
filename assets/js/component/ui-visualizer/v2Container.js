import {Visualizer2} from '../../class/visualizer2/visualizer.js'

export default {
    template: `
        <div class="ui-container visualizer-container visualizer-v2-container">
            <canvas 
                :ref="el => canvas = el" 
                :style="style"
            />
        </div>
    `,
    setup(){
        const {ref, onMounted, computed, onBeforeUnmount} = Vue
        const {useStore} = Vuex

        const store = useStore()
        let visualizer = null
        
        const app = computed(() => store.getters['getApp'])
        const audio = computed(() => store.getters['playlist/getSongs'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => audio.value.getSong(crtKey.value))
        const crtColor = computed(() => crtItem.value.color)
        const crtlogoPath = computed(() => crtItem.value.logoPath)

        const style = ref({filter: `
            drop-shadow(0 0 2px #${crtColor.value.toString(16)}) 
            drop-shadow(0 0 2px #${crtColor.value.toString(16)}) 
            brightness(1.5)
        `})

        const canvas = ref()
        const radius = 30
        const color = 0xffffff

        onMounted(() => {
            visualizer = new Visualizer2({app: app.value, audio: audio.value, color, canvas: canvas.value, radius, logoPath: crtlogoPath.value})
        })

        onBeforeUnmount(() => {
            visualizer.dispose()
            visualizer = null
            console.log(app.value.renderer.info)
        })


        return{
            canvas,
            style
        }
    }
}