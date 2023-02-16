import {imgPath} from '../../../config.js'
import {playlist} from '../../../data/data.js'

export default {
    template: `
        <div class="player-button type-button" @click="setVisualizerType">
            <div>
                <img src="${imgPath}pause_btn_type.png">
            </div>
            <div>
                <span>{{displayType}}</span>
            </div>
        </div>
    `,
    setup(){
        const {computed, ref, watch} = Vue
        const {useStore} = Vuex


        // player
        const store = useStore()
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const defaultType = computed(() => playlist[currentIdx.value].type)
        

        // variable
        const types = [0, 1, 2]
        const idx = ref(types.findIndex(e => e === defaultType.value))
        const displayType = computed(() => types[idx.value])


        // method
        const setVisualizerType = () => {
            idx.value = (idx.value + 1) % types.length
            store.dispatch('player/setVisualizerType', displayType.value)
        }

        
        // watch
        watch(defaultType, () => {
            idx.value = types.findIndex(e => e === defaultType.value)
        })


        return{
            setVisualizerType,
            displayType
        }
    }
}