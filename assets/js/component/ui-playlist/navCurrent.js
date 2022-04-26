import NavCurrentInfo from './navCurrentInfo.js'
import NavCurrentDifficulty from './navCurrentDifficulty.js'

import Songs from '../../data/songs.js'

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
        const {computed, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const key = computed(() => store.getters['playlist/getCrtKey'])
        const audio = computed(() => store.getters['getAudio'])
        const songs = computed(() => store.getters['playlist/getSongs'])

        const setAudio = () => {
            songs.value.createContext(key.value)
        }

        const clickToPlay = () => {
            if(!songs.value.getAudio(key.value)) return
            setAudio()
            songs.value.stopAudio(key.value, true)
            store.dispatch('playlist/setPlaying', true)
        }

        watch(key, (cur, pre) => {
            songs.value.stopAudio(pre)
            songs.value.playAudio(cur)
        })

        return{
            clickToPlay
        }
    }
}