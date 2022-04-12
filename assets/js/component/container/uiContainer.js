import UiOpen from "../ui-open/uiOpen.js"

export default {
    components: {
        'ui-open': UiOpen
    },
    template: `
        <div id="ui-container">

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