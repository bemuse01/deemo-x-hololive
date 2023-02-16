import {selectorWidth} from '../../../config.js'

import SelectorBg from './selectorBg.js'
import SelectorItems from './selectorItems.js'
import SelectorNowPlaying from './selectorNowPlaying.js'

export default {
    components: {
        'selector-bg': SelectorBg,
        'selector-items': SelectorItems,
        'selector-nowPlaying': SelectorNowPlaying
    },
    template: `
        <div 
            class="playlist-selector"
            :style="selectorStyle"
        >

            <div 
                class="selector-scale" 
                :style="scaleStyle"
            >
            
                <selector-bg :style="childStyle" />
                <selector-items :style="childStyle" />
                <selector-nowPlaying :style="childStyle" />

            </div>

        </div>
    `,
    setup(){
        const {computed, ref} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const scale = computed(() => store.getters['app/getScale'])


        // style
        const selectorStyle = computed(() => ({
            position: 'absolute',
            top: '50%',
            transform: 'translate(0, -50%)',
            width: `${selectorWidth}`,
            height: '100%'
        }))
        const scaleStyle = computed(() => ({
            transform: `scale(${scale.value})`,
            position: 'absolute',
            width: '100%',
            height: '100%',
            transformOrigin: 'left'
        }))
        const childStyle = ref({
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: '-40px',
            transform: 'translate(-50%, -50%)',
        })


        return {
            selectorStyle,
            scaleStyle,
            childStyle
        }
    }
}