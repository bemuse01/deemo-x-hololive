import Visualizer from '../../class/visualizer2/visualizer.js'

export default {
    template: `
        <div class="ui-container visualizer-container visualizer-v2-container">
            <div :ref="el => element = el"></div>
        </div>
    `,
    setup(){
        const {nextTick, onMounted, onUnmounted, ref, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const visualizer = ref()
        
        const app = computed(() => store.getters['getApp'])
        const audio = computed(() => store.getters['playlist/getSongs'])

        const element = '.visualizer-v2-container > div'
        const radius = 28

        onMounted(() => {
            nextTick(() => {
                visualizer.value = new Visualizer({app: app.value, audio: audio.value, color: 0xffffff, element, radius})
            })
        })

        onUnmounted(() => {
            visualizer.value.dispose()
        })

        return{
            element
        }
    }
}