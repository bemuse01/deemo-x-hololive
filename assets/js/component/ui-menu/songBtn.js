export default {
    template: `
        <div class="menu-btn song-btn" @click="toggleSong">
            <img :src="songBtnSrc">
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const isPlaying = computed(() => store.getters['menu/getIsPlaying'])
        const songs = computed(() => store.getters['playlist/getSongs'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => audio.value.getSong(crtKey.value))
        const songBtnSrc = computed(() => {
            if(isPlaying.value) return './assets/src/img/pause_btn_retry.png'
            else return './assets/src/img/pause_btn_resume.png'
        })
        const playing = computed(() => store.getters['playlist/getPlaying'])

        const playSong = () => {
            if(crtItem.value.isDefault) return

            songs.value.resumeAudio(crtKey.value)
            store.dispatch('menu/setIsPlaying', true)
        }

        const pauseSong = () => {
            if(crtItem.value.isDefault) return

            songs.value.pauseAudio(crtKey.value)
            store.dispatch('menu/setIsPlaying', false)
        }

        const toggleSong = () => {
            if(isPlaying.value){
                pauseSong()
            }
            else{
                playSong()
            }
        }

        return{
            crtItem,
            playing,
            songBtnSrc,
            toggleSong,
        }
    }
}