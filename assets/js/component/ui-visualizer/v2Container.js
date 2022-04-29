// import {Visualizer2} from '../../class/visualizer2/visualizer.js'

const v2Container = {
    template: `
        <div class="ui-container visualizer-container visualizer-v2-container">
            <div :ref="el => element = el"></div>
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

        const element = '.visualizer-v2-container > div'
        const radius = 30

        onMounted(() => {
            nextTick(() => {
                visualizer = new Visualizer2({app: app.value, audio: audio.value, color: 0xffffff, element, radius, logoSrc: crtItem.value.logoSrc})
            })
        })

        onBeforeUnmount(() => {
            visualizer.dispose()
            visualizer = null
            console.log(app.value.renderer.info)
        })


        return{
            element
        }
    }
}