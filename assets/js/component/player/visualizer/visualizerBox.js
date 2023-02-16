import VisualizerBg from './visualizerBg.js'
import Visualizer0 from './visualizer0.js'
import Visualizer1 from './visualizer1.js'
import Visualizer2 from './visualizer2.js'
import VisualizerProgress from './visualizerProgress.js'

export default {
    components: {
        'visualizer-bg': VisualizerBg,
        'visualizer-0': Visualizer0,
        'visualizer-1': Visualizer1,
        'visualizer-2': Visualizer2,
        'visualizer-progress': VisualizerProgress,
    },
    template: `
        <div 
            class="visualizer-box"
            :style="boxStyle"
        >

            <visualizer-bg />

            <visualizer-0 v-if="renderType === 0" />
            <visualizer-1 v-else-if="renderType === 1" />
            <visualizer-2 v-else-if="renderType === 2" />

            <visualizer-progress />

        </div>
    `,
    setup(){
        const {computed, ref} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const visualizerType = computed(() => store.getters['player/getVisualizerType'])
        const renderType = computed(() => isNaN(visualizerType.value) ? +visualizerType.value : visualizerType.value)


        // style
        const boxStyle = ref({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
        })


        return{
            boxStyle,
            renderType
        }
    }
}