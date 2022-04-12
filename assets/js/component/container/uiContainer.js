import UiOpen from "../ui-open/uiOpen.js"

export default {
    components: {
        'ui-open': UiOpen
    },
    template: `
        <div id="ui-container">

            <ui-open v-if="showing.open"></ui-open>

        </div>
    `,
    setup(){
        const {reactive} = Vue

        const showing = reactive({
            open: true,
        })

        return{
            showing
        }
    }
}