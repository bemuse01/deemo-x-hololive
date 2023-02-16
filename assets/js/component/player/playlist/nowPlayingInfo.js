import {playlist} from '../../../data/data.js'
import {empty, imgPath} from '../../../config.js'

const checkTime = (time) => {
    return time < 10 ? '0' + time : time
}

const changeTime = (duration) => {
    const min = ~~(duration / 60)
    const sec = ~~(duration % 60)
    return `${checkTime(min)}:${checkTime(sec)}`
}

export default {
    template: `
        <div class="nowPlaying-info">
                    
            <div class="info-title-box">
                
                <div class="info-bg">
                    <img src="${imgPath}song_select_namebar.png">
                </div>
                
                <div class="info-text info-text-title">
                    
                    <div class="info-name">
                        <span>{{name}}</span>
                    </div>

                    <div class="info-vocal">
                        <span>{{vocal}}</span>
                    </div>

                </div>
            
            </div>

            <div class="info-duration-box">
            
                <div class="info-bg">
                    <img src="${imgPath}song_select_scorebar_easy.png">
                </div>
                
                <div class="info-text">

                    <div class="info-duration">
                        <span>{{displayDuration}}</span>
                    </div>
                
                </div>
                
            </div>

        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const list = computed(() => store.getters['player/getPlayer'].getList())
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const duration = computed(() => list.value[currentIdx.value].duration)
        const name = computed(() => playlist[currentIdx.value].name)
        const vocal = computed(() => playlist[currentIdx.value].vocal)
        const isHome = computed(() => playlist[currentIdx.value].isHome)


        // variable
        const displayDuration = computed(() => isHome.value ? empty : changeTime(duration.value))


        return{
            name,
            vocal,
            displayDuration
        }
    }
}