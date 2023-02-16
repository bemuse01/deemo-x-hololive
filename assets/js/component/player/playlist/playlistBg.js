import {playlist} from '../../../data/data.js'

const getTranslateY = (len, key) => {
    return -100 / len * key
}

export default {
    template: `
        <div 
            class="playlist-bg"
            :style="boxStyle"
        >

            <div
                v-for="bg in bgs"
                :key="bg.key"
                :style="bg.style.wrapper"
            >

                <div 
                    class="bg-img" 
                    :style="bg.style.img"
                >
                </div>

                <div 
                    class="bg-overlay"
                    :style="bg.style.overlay"
                >
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

        
        // varialbe
        const isHome = computed(() => playlist[currentIdx.value].isHome)
        const playlistCount = playlist.length
        const bgs = ref(Array.from(playlist.map((item, key) => {
            const {bgPath, isHome} = item
            const overlay = isHome ? 'transparent' : 'rgba(0, 0, 0, 1)'

            const style = {
                wrapper: {
                    position: 'relative',
                    width: '100vw',
                    height: '100vh'
                },
                img: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: `url('${bgPath}') no-repeat center center / cover`
                },
                overlay: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to right, ${overlay}, 30%, transparent)`
                }
            }

            return{
                key,
                style
            }
        })))


        // style
        const boxStyle = computed(() => ({
            transform: `translate(0, ${getTranslateY(playlistCount, currentIdx.value)}%)`,
            filter: isHome.value ? 'none' : 'brightness(1.15)',
            position: 'absolute',
            width: '100%',
            height: 'auto',
            transition: 'transform 0.8s, filter 0.8s'
        }))


        return{
            boxStyle,
            bgs
        }
    }
}