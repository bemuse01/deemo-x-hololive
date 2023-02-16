// import SongBtn from './songBtn.js'
// import HomeBtn from './homeBtn.js'
// import VolumeBtn from './volumeBtn.js'
import ControlButton from './controlButton.js'
import VolumeButton from './volumeButton.js'
import BackButton from './backButton.js'
import TypeButton from './typeButton.js'

import {playlist} from '../../../data/data.js'

export default {
    components: {
        // 'song-btn': SongBtn,
        // 'home-btn': HomeBtn,
        // 'volume-btn': VolumeBtn
        'control-button': ControlButton,
        'volume-button': VolumeButton,
        'type-button': TypeButton,
        'back-button': BackButton
    },
    template: `
        <div 
            class="button-box" 
            :style="boxStyle"
        >

            <control-button />
            <volume-button />
            <type-button />
            <back-button v-if="isPlayButtonClicked" />

        </div>
    `,
    setup(){
        const {computed, ref} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const isHome = computed(() => playlist[currentIdx.value].isHome)
        const isPlayButtonClicked = computed(() => store.getters['player/getIsPlayButtonClicked'])
        const scale = computed(() => store.getters['app/getScale'])


        // style
        const boxStyle = computed(() => ({
            position: 'absolute',
            top: '13px',
            right: '20px',
            width: 'auto',
            height: 'auto',
            transformOrigin: 'right top',
            transform: `scale(${scale.value})`,
            display: 'flex'
        }))


        // watch(playing, (cur) => {
        //     if(cur) store.dispatch('menu/setIsPlaying', true)
        // })

        // watch(crtItem, () => {
        //     store.dispatch('menu/setIsPlaying', true)
        // })

        return{
            boxStyle,
            isPlayButtonClicked
        }
    }
}