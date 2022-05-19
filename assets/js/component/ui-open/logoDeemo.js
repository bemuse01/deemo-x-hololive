import Logo from '../../class/logo/logo.js'

export default {
    template: `
        <div 
            class="ui-container open-deemo-container"
            :style="style"
            :ref="el => element = el"
        >
            <canvas :ref="el => canvas = el" />
        </div>
    `,
    setup(){
        const {reactive, computed, watchEffect, onBeforeUnmount, onMounted, watch, ref} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const app = computed(() => store.getters['getApp'])
        const canPlay = computed(() => store.getters['open/getCanPlay'])
        const anim = reactive({
            child: false
        })
        const style = ref({right: '50%', transform: 'translate(50%, -50%)'})
        const src = './assets/src/logo.png'
        const element = ref()
        const canvas = ref()
        let logo = null

        const slide = () => {
            style.value.right = '0'
            style.value.transform = 'translate(0, -50%)'
        }

        const hide = () => {
            store.dispatch('open/setAnim', {name: 'deemo', value: true})
        }

        watchEffect(() => {
            for(const name in anim){
                if(!anim[name]) return
            }

            slide()
            hide()
        })
    

        onMounted(() => {
            watch(app, app => {
                if(app){
                    logo = new Logo({app, anim, src, element: element.value, canvas: canvas.value})
                }
            })
        })
        
        onBeforeUnmount(() => {
            logo.dispose()
            logo = null
            console.log(app.value.renderer.info)
        })

        return{
            style,
            element,
            canvas
        }
    }
}