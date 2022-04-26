import Visualizer from '../../class/visualizer1/visualizer.js'
import Particle from '../../class/particle/particle.js'

export default {
    template: `
        <div class="ui-container visualizer-container visualizer-v1-container">
            <div :ref="el => element = el"></div>
        </div>
    `,
    setup(){
        const {nextTick, onMounted, onUnmounted, ref, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const visualizer = ref()
        const particle = ref()

        const app = computed(() => store.getters['getApp'])
        const audio = computed(() => store.getters['playlist/getSongs'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))

        const element = '.visualizer-v1-container > div'
        const radius = 17
        const color = crtItem.value.color

        onMounted(() => {
            nextTick(() => {
                particle.value = new Particle({app: app.value, audio: audio.value, color, element})
                visualizer.value = new Visualizer({app: app.value, audio: audio.value, color, element, radius})
            })
        })

        onUnmounted(() => {
            visualizer.value.dispose()
            particle.value.dispose()
        })

        return{
            element
        }
    }
}