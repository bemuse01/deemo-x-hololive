import {playlist} from '../../../data/data.js'

export default {
    template: `
        <div 
            class="visualizer-bg"
            :style="bgStyle"
        >

            <div 
                class="bg-img" 
                :style="imgStyle"
            ></div>

            <div 
                class="bg-overlay" 
                :style="overlayStyle"
            ></div>
            
        </div>
    `,
    setup(){
        const {ref, computed} = Vue
        const {useStore} = Vuex

        // store
        const store = useStore()
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const bgPath = computed(() => playlist[currentIdx.value].bgPath)


        // style
        const bgStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%'
        })
        const imgStyle = computed(() => ({
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `url('${bgPath.value}') no-repeat center center / cover`
        }))
        const overlayStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `rgba(0, 0, 0, 0.8)`
        })


        return{
            bgStyle,
            imgStyle,
            overlayStyle
        }
    }
}