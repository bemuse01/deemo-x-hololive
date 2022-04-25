import NavCurrentInfo from './navCurrentInfo.js'
import NavCurrentDifficulty from './navCurrentDifficulty.js'

import Songs from '../../data/songs.js'

export default {
    components: {
        'nav-current-info': NavCurrentInfo,
        'nav-current-difficulty': NavCurrentDifficulty
    },
    template: `
        <div class="nav-current" @click="setAudio">
          
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
        const audios = Array.from({length: Songs.length}, (_, key) => {
            const {isDefault, songSrc} = Songs[key]
            
            const audio = isDefault ? undefined : new Audio()

            if(audio){
                audio.loop = true
                audio.src = songSrc
                audio.volume = 0
                audio.addEventListener('canplaythrough', () => onLoadAudio(key, audio))
            }

            return audio
        })
        const maxVolume = 1

        const setAudio = () => {
            if(!audios[key.value]) return
            audio.value.close()
            audio.value.create(audios[key.value])
        }

        const onLoadAudio = (idx, audio) => {
            store.dispatch('playlist/setSongByKey', {idx, key: 'length', value: audio.duration})
        }

        const playAudio = (audio) => {
            if(!audio) return

            createTween({audio, 
                s: {volume: 0},
                e: {volume: maxVolume},
                cbs: {
                    onStart: (audio) => {
                        audio.currentTime = audio.duration * 0.2
                        audio.play()
                    }
                },
                delay: 500
            })
        }

        const stopAudio = (audio) => {
            if(!audio) return

            createTween({audio, 
                s: {volume: maxVolume},
                e: {volume: 0},
                cbs: {
                    onComplete: (audio) => audio.pause()
                },
                delay: 0
            })
        }

        const createTween = ({audio, s, e, cbs, delay}) => {
            const start = s
            const end = e 

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .delay(delay)
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

        return{
            setAudio
        }
    }
}