import v1Container from './v1Container.js'
import v2Container from './v2Container.js'
import v0Container from './v0Container.js'
import vProgress from './vProgress.js'
import vBackground from './vBackground.js'

export default {
    components: {
        'v0-container': v0Container,
        'v1-container': v1Container,
        'v2-container': v2Container,
        'v-progress': vProgress,
        'v-background': vBackground
    },
    template: `
        <div class="ui ui-visualizer">

            <!--<v-background />-->
            <v0-container v-if="type === 0" />
            <v1-container v-else-if="type === 1" />
            <v2-container v-else-if="type === 2" />
            <v-progress v-if="type < 3"/>

        </div>
    `,
    setup(){
        const {computed, ref, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const playing = computed(() => store.getters['playlist/getPlaying'])
        const loadingDelay = store.getters['loading/getLoadingDelay']
        const needsShow = ref(false)

        const type = computed(() => {
            if(crtItem.value.isDefault) return 3
            else{
                if(playing.value || needsShow.value) return +crtItem.value.type
                else return 3
            }
        })

        const show = () => {
            needsShow.value = true
        }

        const hide = () => {
            needsShow.value = false
        }

        watch(playing, (cur, pre) => {
            if(cur){
                show()
            }else{
                setTimeout(() => hide(), loadingDelay)
            }
        })

        return{
            type,
        }
    }
}