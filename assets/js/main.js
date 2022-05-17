import Store from './store/index.js'

import App from './class/app/app.js'

import BgContainer from './component/container/bgContainer.js'
import CanvasContainer from './component/container/canvasContainer.js'
import UiContainer from './component/container/uiContainer.js'
import LoadingContainer from './component/container/loadingContainer.js'
import Loading2Container from './component/container/loading2Container.js'
import Method from './method/method.js'

const vueApp = Vue.createApp({
    components: {
        'bg-container': BgContainer,
        'canvas-container': CanvasContainer,
        'ui-container': UiContainer,
        'loading-container': LoadingContainer,
        'loading2-container': Loading2Container
    },
    setup(){
        const {onMounted} = Vue
        const store = Vuex.useStore()

        Vue.nextTick(() => {
            store.dispatch('setApp', new App())
        })

        const animate = () => {
            TWEEN.update()

            requestAnimationFrame(animate)
        }
        
        const resize = () => {
            const screenHeight = window.screen.height
            const innerHeight = Method.clamp(window.innerHeight + 151, 0, screenHeight)
            const scale = innerHeight / screenHeight
            store.dispatch('setScale', scale)

            console.log(store.getters['getScale'])
        }

        onMounted(() => {
            window.addEventListener('resize', () => resize())
            animate()
        })
    }
})

vueApp.use(Store)
vueApp.mount('#wrap')