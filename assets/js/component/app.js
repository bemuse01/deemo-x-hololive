import Method from '../method/method.js'
import App from '../class/app/app.js'
import LoadManager from '../class/loadManager/loadManager.js'

import LoadingContainer from './loading/loadingContainer.js'
import ClickerContainer from './clicker/clickerContainer.js'
import PlayerContainer from './player/playerContainer.js'

import {playlist, ids, uiImgs} from '../data/data.js'

export default {
    components: {
        'loading-container': LoadingContainer,
        'clicker-container': ClickerContainer,
        'player-container': PlayerContainer
    },
    template: `
        <div
            id="app"
            :style="appStyle"
            :ref="el => app = el"
        >

            <transition-group
                name="fade"
                tag="div"
                :style="groupStyle"
            >

                <loading-container 
                    v-if="isLoadingContainerRendered" 
                    @loadingTweenDone="onLoadingTweenDone" 
                    :isResourceLoaded="isResourceLoaded"
                />
                
                <clicker-container 
                    v-else-if="!isLoadingContainerRendered && !isClicked" 
                    @click="onClick" 
                />

                <player-container v-else />

            </transition-group>

        </div>
    `,
    setup(){
        const {ref, onMounted, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()


        // variable
        const app = ref()
        const browserUiHeight = 151
        const isLoadingContainerRendered = ref(true)
        const isResourceLoaded = ref(false)
        const isClicked = ref(false)


        // style
        const appStyle = ref({
            position: 'relative',
            width: '100%',
            height: '100%'
        })
        const groupStyle = ref({
            width: '100%',
            height: '100%'
        })


        // method
        const loadResources = async () => {
            const bgs = playlist.map(e => e.bgPath)
            const logos = playlist.map(e => e.logoPath)
            const audios = playlist.map(e => e.audioPath)

            console.log('loading...')

            const uiSrcs = await Promise.all(uiImgs.map(img => LoadManager.loadImg(img.path)))
            const bgSrcs = await Promise.all(bgs.map(path => LoadManager.loadImg(path)))
            const logoSrcs = await Promise.all(logos.map(path => LoadManager.loadImg(path)))
            const audioSrcs = await Promise.all(audios.map(path => LoadManager.loadAudio(path)))

            console.log('done...')

            store.dispatch('resource/setUis', uiImgs.map(({name}, idx) => ({name, src: uiSrcs[idx]})))
            store.dispatch('resource/setBgs', bgSrcs)
            store.dispatch('resource/setLogos', logoSrcs)
            store.dispatch('resource/setAudios', audioSrcs)

            isResourceLoaded.value = true
        }
        const onLoadingTweenDone = () => {
            isLoadingContainerRendered.value = false
        }
        const onClick = () => {
            isClicked.value = true
        }
        const createThreeApp = () => {
            store.dispatch('app/setApp', new App({element: app.value}))
        }
        const setUiScale = () => {
            const screenHeight = window.screen.height
            const innerHeight = Method.clamp(window.innerHeight + browserUiHeight, 0, screenHeight)
            const scale = innerHeight / screenHeight
            
            store.dispatch('app/setScale', scale)
        }
        const init = () => {
            createThreeApp()
            loadResources()
        }


        // event
        const animate = () => {
            TWEEN.update()

            requestAnimationFrame(animate)
        }
        const onWindowResize = () => {
            setUiScale()
        }
        const initEvent = () => {
            animate()
            window.addEventListener('resize', onWindowResize)
        }


        // hook
        onMounted(() => {
            init()
            initEvent()
        })


        return{
            appStyle,
            groupStyle,
            app,
            isClicked,
            isResourceLoaded,
            isLoadingContainerRendered,
            onLoadingTweenDone,
            onClick
        }
    }
}