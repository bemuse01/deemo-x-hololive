export default {
    template: `
        <div 
            class="overlay open-overlay" 
            :style="style.overlay"
            :ref="el => element = el"
        ></div>
    `,
    setup(){
        const {reactive, ref, onMounted, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const style = reactive({
            overlay: {opacity: '0'}
        })
        const element = ref()

        const show = () => {
            style.overlay.opacity = '1'
        }

        const onTransitionend = () => {
            store.dispatch('open/setAnim', {name: 'overlay', value: true})
        }

        watchEffect(() => {
            if(!store.getters['open/getAnim'].hololive) return

            show()
        })

        onMounted(() => {
            element.value.addEventListener('transitionend', onTransitionend)
        })

        return{
            style,
            element
        }
    }
}