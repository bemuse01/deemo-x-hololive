export default {
    template: `
        <div class="ui-container menu-btn-container" v-show="crtItem.isDefault" :style="containerStyle">
            <div class="menu-btn song-btn">
                <img :src="songBtnSrc">
            </div>
            <div class="menu-btn home-btn" v-show="playing">
                <img src="./assets/src/pause_btn_home.png">
            </div>
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const songs = computed(() => store.getters['playlist/getSongs'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const crtSongNowPlaying = computed(() => {
            if(crtItem.value.isDefault) return false
            else return !crtItem.value.audio.paused
        })
        const songBtnSrc = computed(() => {
            if(crtSongNowPlaying.value) return './assets/src/pause_btn_retry.png'
            else './assets/src/pause_btn_resume.png'
        })
        const containerStyle = computed(() => {
            if(crtItem.value.isDefault) return {filter: 'invert(1)'}
            else return {filter: 'none'}
        })
        const playing = computed(() => store.getters['playlist/getPlaying'])

        const playSong = () => {
            if(crtItem.value.isDefault) return

            songs.value.playAudio(crtItem.value, 0)
        }

        const pauseSong = () => {

        }

        const toggleSong = () => {
            if(crtSongNowPlaying.value) pauseSong()
            else playSong()
        }

        return{
            crtItem,
            playing,
            containerStyle,
            songBtnSrc
        }
    }
}