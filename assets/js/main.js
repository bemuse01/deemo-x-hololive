import Store from './store/index.js'

import App from './class/app/app.js'

import BgContainer from './component/container/bgContainer.js'
import CanvasContainer from './component/container/canvasContainer.js'
import UiContainer from './component/container/uiContainer.js'
import LoadingContainer from './component/container/loadingContainer.js'

const vueApp = Vue.createApp({
    components: {
        'bg-container': BgContainer,
        'canvas-container': CanvasContainer,
        'ui-container': UiContainer,
        'loading-container': LoadingContainer
    },
    setup(){
        const store = Vuex.useStore()

        Vue.nextTick(() => {
            store.dispatch('setApp', new App())
        })

        const animate = () => {
            TWEEN.update()

            requestAnimationFrame(animate)
        }
        
        animate()
    }
})

vueApp.use(Store)
vueApp.mount('#wrap')