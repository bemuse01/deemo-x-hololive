import NavCurrentInfo from './navCurrentInfo.js'
import NavCurrentDifficulty from './navCurrentDifficulty.js'

export default {
    components: {
        'nav-current-info': NavCurrentInfo,
        'nav-current-difficulty': NavCurrentDifficulty
    },
    template: `
        <div class="nav-current" @click="clickToPlay">
          
            <nav-current-info />
            <nav-current-difficulty />

        </div>
    `,
    setup(){
        const {computed, watch, onMounted} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const key = computed(() => store.getters['playlist/getCrtKey'])
        const songs = computed(() => store.getters['playlist/getSongs'])

        const setAudio = () => {
            songs.value.createContext(key.value)
        }

        const playAudio = () => {
            if(!songs.value.getAudio(key.value)) return

            songs.value.setAnimate(true)
            songs.value.stopAudio(key.value)
            store.dispatch('playlist/setPlaying', true)
        }

        const clickToPlay = () => {
            playAudio()
        }

        watch(key, (cur, pre) => {
            setAudio()
            songs.value.stopAudio(pre)
            songs.value.playAudio(cur)
        })

        return{
            clickToPlay
        }
    }
}