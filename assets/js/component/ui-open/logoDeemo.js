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
        const {reactive, computed, watchEffect, onBeforeUnmount, nextTick, onMounted, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const app = computed(() => store.getters['getApp'])
        const srcLoaded = computed(() => store.getters['playlist/getSrcLoaded'])
        const anim = reactive({
            child: false
        })
        const style = reactive({
            container: {right: '50%', transform: 'translate(50%, -50%)'}
        })
        const src = './assets/src/logo.png'
        const element = '.open-deemo-container'
        let logo = null

        const slide = () => {
            style.container.right = '0'
            style.container.transform = 'translate(0, -50%)'
        }

        watchEffect(() => {
            for(const name in anim){
                if(!anim[name]) return
            }

            slide()
            store.dispatch('open/setAnim', {name: 'deemo', value: true})
        })

        watch(srcLoaded, (cur) => {
            if(cur){
                // onMounted(() => {
                    nextTick(() => {
                        logo = new Logo(app.value, anim, src, element)
                    })
                // })
            }
        })
        
        onBeforeUnmount(() => {
            logo.dispose()
            logo = null
            console.log(app.value.renderer.info)
        })

        return{
            style,
        }
    }
}