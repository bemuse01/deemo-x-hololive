import UiOpen from "../ui-open/uiOpen.js"
import UiPlaylist from "../ui-playlist/uiPlaylist.js"

export default {
    components: {
        'ui-open': UiOpen,
        'ui-playlist': UiPlaylist
    },
    template: `
        <div id="ui-container">

            <ui-open v-if="openShowing"></ui-open>
            <ui-playlist></ui-playlist>

        </div>
    `,
    setup(){
        const {reactive, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const openShowing = computed(() => store.getters['open/getShowing'])
        const playlistShowing = computed(() => store.getters['playlist/getShowing'])

        return{
            openShowing,
            playlistShowing
        }
    }
}