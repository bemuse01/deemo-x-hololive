import {imgPath} from '../../../config.js'

export default {
    template: `
        <div class="player-button back-button" @click="onClick">
            <img src="${imgPath}pause_btn_home.png">
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const player = computed(() => store.getters['player/getPlayer'])
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])


        // method
        const back = () => {
            player.value.resetAudio(currentIdx.value, false)
            store.dispatch('player/setIsPlayButtonClicked', false)
        }
        const onClick = () => {
            back()
        }


        return{
            onClick
        }
    }
}