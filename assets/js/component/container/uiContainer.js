import UiOpen from "../ui-open/uiOpen.js"

export default {
    components: {
        'ui-open': UiOpen
    },
    template: `
        <div id="ui-container">

            <ui-open v-if="openShowing"></ui-open>

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