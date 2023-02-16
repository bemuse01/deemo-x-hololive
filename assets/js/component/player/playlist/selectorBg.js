import {playlist} from '../../../data/data.js'
import {imgPath, selectorWidth, selectorHeight} from '../../../config.js'

const getDeg = ({degree, deg, offset, key}) => {
    return (offset + degree) - deg * key
}

const setOpacity = (style, key) => {
    if(Songs[key].isDefault) style.container.opacity = '1'
    else style.container.opacity = '0.25'
}

export default {
    template: `
        <div 
            class="selector-bg" 
            :style="bgStyle"
        >
        
            <div 
                class="flare" 
                :style="[flareStyle, childStyle]"
            >
                <img src="${imgPath}song_select_flare.png">
            </div>

            <div 
                class="flare-beam"
                :style="[beamWrapperStyle, childStyle]"
            >
                <div 
                    :style="beamStyle"
                >
                    <img src="${imgPath}song_select_flare_beam.png">
                </div>
            </div>
            
        </div>
    `,
    setup(){
        const {ref, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const isHome = computed(() => playlist[currentIdx.value].isHome)


        // variable
        const degree = 120
        const offset = (180 -  degree) / 2
        const playlistCount = playlist.length
        const deg = degree / (playlistCount - 1)


        // style
        const bgStyle = computed(() => ({
            position: 'absolute',
            width: selectorWidth,
            height: selectorWidth,
            opacity: isHome.value ? '1' : '0.25', 
            transition: 'opacity 0.3s',
        }))
        const childStyle = ref({
            position: 'absolute',
            height: selectorHeight,
            bottom: `calc(634px - ${selectorHeight})`
        })
        const flareStyle = ref({
            width: selectorWidth,
        })
        const beamWrapperStyle = ref({
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: '8px'
        })
        const beamStyle = computed(() => ({
            position: 'absolute',
            transformOrigin: 'center 456px',
            transition: 'transform 0.8s',
            width: '100%',
            height: '100%',
            transform: `rotate(${getDeg({degree, deg, offset, key: currentIdx.value})}deg)`
        }))

        
        return{
            bgStyle,
            childStyle,
            flareStyle,
            beamWrapperStyle,
            beamStyle
        }
    }
}