import {Visualizer0} from '../../class/visualizer0/visualizer.js'

export default {
    template: `
        <div class="ui-container visualizer-container visualizer-v0-container">
            <canvas :ref="el => canvas = el" />
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
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const style = computed(() => ({
            background: `url('${crtItem.value.logoSrc}') no-repeat center center / cover`
        }))

        const canvas = ref()
        const radius = 12
        const color = crtItem.value.color

        onMounted(() => {
            visualizer = new Visualizer0({app: app.value, audio: audio.value, color, canvas: canvas.value, radius, logoSrc: crtItem.value.logoSrc})
        })

        onBeforeUnmount(() => {
            visualizer.dispose()
            visualizer = null
            console.log(app.value.renderer.info)
            console.log(performance.memory)
        })

        return{
            canvas,
            style
        }
    }
}