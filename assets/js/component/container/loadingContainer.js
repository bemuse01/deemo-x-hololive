export default {
    template: `
        <transition
            @beforeEnter="beforeEnter"
        >
        <div 
            v-show="showing"
            id="loading-container" 
            :ref="el => element = el"
            :style="style"
        >
            <div></div>
        </div>
        </transition>
    `,
    setup(){
        const {ref, onMounted, computed, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const element = ref()
        const style = ref({display: 'none', opacity: '0'})
        const showing = computed(() => store.getters['loading/getShowing'])

        const show = () => {
            style.value.opacity = '1'
        }

        const hide = () => {
            style.value.opacity = '0'
        }

        const beforeEnter = () => {
            
        }

        const enter = () => {

        }

        const afterEnter = () => {

        }

        const onTransitionend = () => {
            if(showing.value === false){
                style.value.display = 'none'
            }
        }

        // watchEffect(() => {
        //     if(showing.value) show()
        //     else hide()
        // })

        onMounted(() => {
        })

        return{
            element,
            style,
            showing
        }
    }
}