import Method from '../method/method.js'
import App from '../class/app/app.js'
import LoadManager from '../class/loadManager/loadManager.js'

import UiContainer from './container/uiContainer.js'
import LoadingContainer from './container/loadingContainer.js'
import Loading2Container from './container/loading2Container.js'

import Data from '../data/data.js'

export default {
    components: {
        'ui-container': UiContainer,
        'loading-container': LoadingContainer,
        'loading2-container': Loading2Container
    },
    template: `
        <div
            id="app"
            :style="appStyle"
            :ref="el => app = el"
        >

            <!--<ui-container />
            <loading-container />-->
            <loading2-container v-if="isLoading" />

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
        const loadManager = ref(new LoadManager(Data))
        const isLoading = computed(() => loadManager.value.isLoading)


        // style
        const appStyle = ref({
            position: 'relative',
            width: '100%',
            height: '100%'
        })


        // method
        const loadResources = async () => {
            const resources = await loadManager.value.load()
            console.log(resources)
        }
        const setUiScale = () => {
            const screenHeight = window.screen.height
            const innerHeight = Method.clamp(window.innerHeight + browserUiHeight, 0, screenHeight)
            const scale = innerHeight / screenHeight
            
            store.dispatch('setScale', scale)

            console.log(store.getters['getScale'])
        }
        const createThreeApp = () => {
            store.dispatch('setApp', new App({element: app.value}))
        }
        const init = async () => {
            loadResources()
            createThreeApp()
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
            app,
            isLoading
        }
    }
}