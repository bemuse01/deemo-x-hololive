import {playlist} from '../../../data/data.js'

export default {
    template: `
        <div class="playlist-composer" :style="composerStyle">
            
            <div class="composer-text">
                <span>
                    Composer:
                </span>
            </div>

            <div class="composer-current" :style="composerNameStyle">
                <span>
                    {{composer}}
                </span>
            </div>
        
        </div>
    `,
    setup(){
        const {ref, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const composer = computed(() => playlist[currentIdx.value].composer)
        const isHome = computed(() => playlist[currentIdx.value].isHome)
        const scale = computed(() => store.getters['app/getScale'])

        
        // style
        const composerStyle = computed(() => ({
            position: 'absolute',
            fontFamily: 'FANTIQUE',
            fontSize: '40px',
            letterSpacing: '-0.4px',
            paddingTop: '4px',
            paddingLeft: '28px',
            transition: 'color 0.6s',
            transformOrigin: 'left top',
            color: isHome.value ? 'black' : 'white',
            transform: `scale(${scale.value})`
        }))
        const composerNameStyle = ref({
            paddingTop: '5px'
        })


        return{
            composerStyle,
            composerNameStyle,
            composer
        }
    }
}