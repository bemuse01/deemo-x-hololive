import DeemoLogo from '../../class/deemoLogo/deemo.js'

export default {
    template: `
        <div 
            class="ui-container open-deemo-container"
            :style="style.container"
        >
            <div></div>
        </div>
    `,
    setup(){
        const {reactive, ref, watchEffect, onUnmounted, nextTick} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const deemoLogo = ref()
        const anim = reactive({
            child: false
        })
        const style = reactive({
            container: {right: '50%', transform: 'translate(50%, -50%)'}
        })

        const show = () => {

        }

        const hide = () => {
            
        }

        const slide = () => {
            style.container.right = '0'
            style.container.transform = 'translate(0, -50%)'
        }

        watchEffect(() => {
            for(const name in anim){
                if(!anim[name]) return
            }

            slide()
            store.dispatch('open/setDeemoAnim', true)
        })

        onUnmounted(() => {
            deemoLogo.value.dispose()
        })

        nextTick(() => {
            deemoLogo.value = new DeemoLogo(store, anim)
        })

        return{
            style,
        }
    }
}