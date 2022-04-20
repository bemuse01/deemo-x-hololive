import NavCurrentInfo from './navCurrentInfo.js'
import NavCurrentDifficulty from './navCurrentDifficulty.js'

import Songs from '../../data/songs.js'

export default {
    components: {
        'nav-current-info': NavCurrentInfo,
        'nav-current-difficulty': NavCurrentDifficulty
    },
    template: `
        <div class="nav-current">
          
            <nav-current-info />
            <nav-current-difficulty />

        </div>
    `,
    setup(){
        const {computed, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const key = computed(() => store.getters['playlist/getCrtKey'])
        const audios = Array.from({length: Songs.length}, (_, key) => {
            const {isDefault, songSrc} = Songs[key]
            
            const audio = isDefault ? undefined : new Audio()

            if(audio){
                audio.loop = true
                audio.src = songSrc
                audio.volume = 0
            }

            return audio
        })
        const maxVolume = 0.5

        const playAudio = (audio) => {
            if(!audio) return

            createTween({audio, 
                s: {volume: 0},
                e: {volume: maxVolume},
                cbs: {
                    onStart: (audio) => {
                        audio.currentTime = 0
                        audio.play()
                    }
                }
            })
        }

        const stopAudio = (audio) => {
            if(!audio) return

            createTween({audio, 
                s: {volume: maxVolume},
                e: {volume: 0},
                cbs: {
                    onComplete: (audio) => audio.pause()
                }
            })
        }

        const createTween = ({audio, s, e, cbs}) => {
            const start = s
            const end = e 

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .onUpdate(() => onUpdateTween(audio, start))
            .start()

            for(const cb in cbs) tw[cb](() => cbs[cb](audio))
        }

        const onUpdateTween = (audio, {volume}) => {
            audio.volume = volume
        }

        watch(key, (cur, pre) => {
            stopAudio(audios[pre])
            playAudio(audios[cur])
        })
    }
}