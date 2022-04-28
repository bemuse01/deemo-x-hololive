export default {
    template: `
        <div class="ui-container menu-btn-container" v-show="!crtItem.isDefault">
            <div class="menu-btn song-btn" @click="toggleSong">
                <img :src="songBtnSrc">
            </div>
            <div class="menu-btn home-btn" v-show="playing" @click="back">
                <img src="./assets/src/pause_btn_home.png">
            </div>
        </div>
    `,
    setup(){
        const {computed, ref, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const isPlaying = ref(true)
        const songs = computed(() => store.getters['playlist/getSongs'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const songBtnSrc = computed(() => {
            if(isPlaying.value) return './assets/src/pause_btn_retry.png'
            else return './assets/src/pause_btn_resume.png'
        })
        const playing = computed(() => store.getters['playlist/getPlaying'])

        const playSong = () => {
            if(crtItem.value.isDefault) return

            songs.value.resumeAudio(crtKey.value)
            isPlaying.value = true
        }

        const pauseSong = () => {
            if(crtItem.value.isDefault) return

            songs.value.stopAudio(crtKey.value)
            isPlaying.value = false
        }

        const toggleSong = () => {
            if(isPlaying.value){
                pauseSong()
            }
            else{
                playSong()
            }
        }

        const back = () => {
            store.dispatch('playlist/setPlaying', false)
            songs.value.stopAudio(crtKey.value, true)
            songs.value.setAnimate(false)
            isPlaying.value = true
        }

        watch(playing, (cur, pre) => {
            if(cur) isPlaying.value = true
        })

        return{
            crtItem,
            playing,
            songBtnSrc,
            toggleSong,
            back
        }
    }
}