import Logo from '../../class/logo/logo.js'

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
        const logo = ref()
        const anim = reactive({
            child: false
        })
        const style = reactive({
            container: {right: '50%', transform: 'translate(50%, -50%)'}
        })
        const src = './assets/src/logo.png'
        const element = '.open-deemo-container'

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
            logo.value.dispose()
        })

        nextTick(() => {
            logo.value = new Logo(store, anim, src, element)
        })

        return{
            style,
        }
    }
}