import NowPlayingInfo from './nowPlayingInfo.js'
import NowPlayingBg from './nowPlayingBg.js'

import {playlist} from '../../../data/data.js'

export default {
    components: {
        'nowPlaying-info': NowPlayingInfo,
        'nowPlaying-bg': NowPlayingBg
    },
    template: `
        <div 
            class="selector-nowPlaying" 
            :style="nowPlayingStyle"
            @click="onClick"
        >
          
            <nowPlaying-info />
            <nowPlaying-bg />

        </div>
    `,
    setup(){
        const {ref, computed, watch} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const player = computed(() => store.getters['player/getPlayer'])
        const isHome = computed(() => playlist[currentIdx.value].isHome)


        // variable
        const nowPlayingStyle = ref({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '192px',
            height: '192px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
        })


        // method
        const setAudioStateToPlaying = () => {
            store.dispatch('player/setIsAudioPlaying', true)
        }
        const prePlayAudio = (curIdx, preIdx) => {
            player.value.preStopAudio(preIdx)

            if(isHome.value) return

            player.value.prePlayAudio(curIdx)
        }
        const playAudio = () => {
            if(isHome.value) return

            // init audio before play
            player.value.resetAudio(currentIdx.value, true)

            // set audio state
            store.dispatch('player/setIsPlayButtonClicked', true)
        }


        // event
        const onClick = () => {
            playAudio()
        }


        // watch
        watch(currentIdx, (curIdx, preIdx) => {
            setAudioStateToPlaying()
            prePlayAudio(curIdx, preIdx)
        })


        return{
            nowPlayingStyle,
            onClick
        }
    }
}