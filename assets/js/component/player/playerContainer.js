import Player from '../../class/audio/player.js'
import {playlist} from '../../data/data.js'

import PlaylistBox from './playlist/playlistBox.js'
import VisualizerBox from './visualizer/visualizerBox.js'
import CoverBox from './cover/coverBox.js'
import ButtonBox from './button/buttonBox.js'

export default {
    components: {
        'playlist-box': PlaylistBox,
        'visualizer-box': VisualizerBox,
        'cover-box': CoverBox,
        'button-box': ButtonBox
    },
    template: `
        <div
            id="player-container"
            :style="containerStyle"
        >

            <playlist-box v-if="pvRenderCondition" />
            <visualizer-box v-else />

            <button-box v-if="!isHome" />

            <transition name="fade-1s">

                <cover-box v-if="coverRenderCondition" />

            </transition>

        </div>
    `,
    setup(){
        const {ref, computed, onMounted, watch} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const audios = computed(() => store.getters['resource/getAudios'])
        const isPlayButtonClicked = computed(() => store.getters['player/getIsPlayButtonClicked'])
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const isHome = computed(() => playlist[currentIdx.value].isHome)


        // variable
        const pvRenderCondition = ref(true)
        const coverRenderCondition = ref(false)
        const toggleDelay = 1000


        // style
        const containerStyle = ref({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
        })
        const groupStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%'
        })


        // method
        const toggleCover = () => {
            coverRenderCondition.value = !coverRenderCondition.value
        }
        const toggleBox = () => {
            toggleCover()
            pvRenderCondition.value = !pvRenderCondition.value
        }
        const createPlayer = () => {
            store.dispatch('player/setPlayer', new Player({audios: audios.value, playlist}))
        }
        const init = () => {
            createPlayer()
        }


        // watch
        watch(isPlayButtonClicked, () => {
            toggleCover()
            setTimeout(toggleBox, toggleDelay)
        })


        // hook
        onMounted(() => {
            init()
        })

        
        return{
            containerStyle,
            groupStyle,
            pvRenderCondition,
            coverRenderCondition,
            isHome
        }
    }
}