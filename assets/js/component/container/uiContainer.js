import UiOpen from "../ui-open/uiOpen.js"
import UiPlaylist from "../ui-playlist/uiPlaylist.js"

export default {
    components: {
        'ui-open': UiOpen,
        'ui-playlist': UiPlaylist
    },
    template: `
        <div id="ui-container">

            <ui-playlist></ui-playlist>

            <transition name="fade">

                <ui-open v-if="openShowing"></ui-open>

            </transition>

        </div>
    `,
    setup(){
        const {reactive, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const openShowing = computed(() => store.getters['open/getShowing'])

        return{
            openShowing
        }
    }
}