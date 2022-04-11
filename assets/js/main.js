import Store from './store/index.js'

import App from './class/app/app.js'

import CanvasContainer from './component/canvasContainer.js'
import UiContainer from './component/uiContainer.js'

const vueApp = Vue.createApp({
    components: {
        'canvas-container': CanvasContainer,
        'ui-container': UiContainer,
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