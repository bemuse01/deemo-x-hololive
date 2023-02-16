import {imgPath} from '../../../config.js'
import {playlist} from '../../../data/data.js'

export default {
    template: `
        <div class="player-button control-button" @click="toggleControlButton">
            <img :src="controlButtonSrc">
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const isAudioPlaying = computed(() => store.getters['player/getIsAudioPlaying'])
        const player = computed(() => store.getters['player/getPlayer'])
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const isHome = computed(() => playlist[currentIdx.value].isHome)


        // variable
        const pauseImgPath = `${imgPath}pause_btn_retry.png`
        const playImgPath = `${imgPath}pause_btn_resume.png`
        const controlButtonSrc = computed(() => isAudioPlaying.value ? pauseImgPath : playImgPath)


        // method
        const resumeAudio = () => {
            player.value.resumeAudio(currentIdx.value)
            store.dispatch('player/setIsAudioPlaying', true)
        }
        const pauseAudio = () => {
            player.value.pauseAudio(currentIdx.value)
            store.dispatch('player/setIsAudioPlaying', false)
        }
        const toggleControlButton = () => {
            if(isHome.value) return

            if(isAudioPlaying.value) pauseAudio()
            else resumeAudio()
        }


        return{
            controlButtonSrc,
            toggleControlButton,
        }
    }
}