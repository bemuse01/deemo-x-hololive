import {imgPath} from '../../../config.js'

export default {
    template: `
        <div class="player-button volume-button" @click="setVolume">
            <div>
                <img src="${imgPath}pause_btn_volume.png">
            </div>
            <div>
                <span>{{currentVolume}}</span>
            </div>
        </div>
    `,
    setup(){
        const {computed, ref} = Vue
        const {useStore} = Vuex


        // player
        const store = useStore()
        const player = computed(() => store.getters['player/getPlayer'])
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])


        // variable
        const volumes = [0, 0.25, 0.5, 0.75, 1]
        const idx = ref(volumes.length - 1)
        const currentVolume = computed(() => volumes[idx.value] * 100)


        // method
        const setVolume = () => {
            idx.value = (idx.value + 1) % volumes.length
            player.value.setVolume(currentVolume.value / 100, currentIdx.value)
        }


        return{
            setVolume,
            currentVolume
        }
    }
}