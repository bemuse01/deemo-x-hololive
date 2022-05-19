export default {
    template: `
        <div 
            class="ui-container open-hololive-container"
            :style="style.container"
            :ref="el => element = el"
        >
            <img src="./assets/src/hololive.png">
        </div>
    `,
    setup(){
        const {reactive, watchEffect, ref, onMounted, computed} = Vue
        const {useStore} = Vuex
        const element = ref()

        const store = useStore()
        const deemoAnim = computed(() => store.getters['open/getAnim'].deemo)
        const style = reactive({
            container: {opacity: 0, transform: 'translate(0, 0)'}
        })

        const slide = () => {
            style.container.opacity = 1
            style.container.transform = 'translate(0, -50%)'
        }

        const hide = () => {
            store.dispatch('open/setAnim', {name: 'hololive', value: true})
        }

        const onTransitionend = () => {
            setTimeout(hide, 500)
        }

        watchEffect(() => {
            if(!deemoAnim.value) return

            slide()
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