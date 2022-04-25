import v2Container from './v2Container.js'

export default {
    components: {
        'v2-container': v2Container
    },
    template: `
        <div class="ui ui-visualizer">

            <v2-container v-if="type === 2"></v2-container>

        </div>
    `,
    setup(){
        const {computed, ref} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const type = ref(3)

        return{
            type
        }
    }
}