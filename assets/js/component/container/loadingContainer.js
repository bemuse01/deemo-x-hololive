export default {
    template: `
        <div 
            id="loading-container" 
            :ref="el => element = el"
            :style="style"
        >
            <div></div>
        </div>
    `,
    setup(){
        const {ref, onMounted, computed, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const element = ref()
        const style = ref({zIndex: '-1', opacity: '0'})
        const showing = computed(() => store.getters['loading/getShowing'])

        const show = () => {
            style.value.opacity = '1'
        }

        const hide = () => {
            style.value.opacity = '0'
        }

        const emitHidePlaylist = () => {
            store.dispatch('playlist/setShowing', false)
        }

        const onTransitionstart = () => {
            if(showing.value){
                style.value.zIndex = '99999'
            }
        }

        const onTransitionend = () => {
            if(showing.value === false){
                style.value.zIndex = '-1'
            }else{
                emitHidePlaylist()
            }
        }

        watchEffect(() => {
            if(showing.value) show()
            else hide()
        })

        onMounted(() => {
            element.value.addEventListener('transitionend', onTransitionend)
            element.value.addEventListener('transitionstart', onTransitionstart)
        })

        return{
            element,
            style,
            showing
        }
    }
}