export default {
    template: `
        <div class="ui-container visualizer-vProgress-container">
            <div class="progress-bar" :style="style"></div>
        </div>
    `,
    setup(){
        const {ref, onMounted, computed, onBeforeUnmount} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const audio = computed(() => store.getters['playlist/getPlayer'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const style = ref({
            background: `#${crtItem.value.color.toString(16)}`,
            transform: 'scaleX(0)'
        })
        const animation = ref()

        const animate = () => {
            const {currentTime, duration} = crtItem.value.audio
            const scale = currentTime / duration
            style.value.transform = `scaleX(${scale})`

            animation.value = requestAnimationFrame(() => animate())
        }

        onMounted(() => {
            animate()
        })

        onBeforeUnmount(() => {
            cancelAnimationFrame(animation.value)
        })
        
        return{
            style
        }
    }
}