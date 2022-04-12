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
        const {computed, reactive, ref, watch, watchEffect, onUnmounted, nextTick, toRefs} = Vue
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

        watchEffect(() => {
            for(const name in anim){
                if(!anim[name]) return
            }

            console.log(anim)
        })

        onUnmounted(() => {

        })

        nextTick(() => {
            deemoLogo.value = new DeemoLogo(store, anim)
        })

        return{
            style,
            hide
        }
    }
}