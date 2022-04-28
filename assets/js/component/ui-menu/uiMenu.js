import MenuBtn from './menuBtn.js'

export default {
    components: {
        'menu-btn': MenuBtn
    },
    template: `
        <div class="ui ui-menu">

            <menu-btn />
        
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