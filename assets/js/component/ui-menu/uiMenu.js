import BtnContainer from './btnContainer.js'

export default {
    components: {
        'btn-container': BtnContainer
    },
    template: `
        <div class="ui ui-menu">

            <btn-container />
        
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()

        return{
        }
    }
}