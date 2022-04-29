export default {
    template: `
        <div class="menu-btn home-btn" v-show="playing" @click="back">
            <img src="./assets/src/pause_btn_home.png">
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const songs = computed(() => store.getters['playlist/getSongs'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const playing = computed(() => store.getters['playlist/getPlaying'])

        const back = () => {
            store.dispatch('playlist/setPlaying', false)
            store.dispatch('menu/setIsPlaying', true)
            songs.value.stopAudio(crtKey.value)
            songs.value.setAnimate(false)
        }

        return{
            playing,
            back
        }
    }
}