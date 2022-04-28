import {Visualizer0} from '../../class/visualizer0/visualizer.js'

export default {
    template: `
        <div class="ui-container visualizer-container visualizer-v0-container">
            <div :ref="el => element = el"></div>
            <div class="v-logo v0-logo">
                <div :style="style"></div>
            </div>
        </div>
    `,
    setup(){
        const {nextTick, onMounted, computed, onBeforeUnmount} = Vue
        const {useStore} = Vuex

        const store = useStore()
        let visualizer = null

        const app = computed(() => store.getters['getApp'])
        const audio = computed(() => store.getters['playlist/getSongs'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const style = computed(() => ({
            background: `url('${crtItem.value.logoSrc}') no-repeat center center / cover`
        }))

        const element = '.visualizer-v0-container > div'
        const radius = 13
        const color = crtItem.value.color

        onMounted(() => {
            nextTick(() => {
                visualizer = new Visualizer0({app: app.value, audio: audio.value, color, element, radius})
            })
        })

        onBeforeUnmount(() => {
            visualizer.dispose()
            visualizer = null
            console.log(app.value.renderer.info)
        })

        return{
            element,
            style
        }
    }
}