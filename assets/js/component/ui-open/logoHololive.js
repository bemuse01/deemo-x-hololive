export default {
    template: `
        <div 
            class="ui-container open-hololive-container"
            :style="style.container"
        >
            <img src="./assets/src/hololive.png">
        </div>
    `,
    setup(){
        const store = Vuex.useStore()
        const style = Vue.reactive({
            container: {opacity: 0, transform: 'translate(0, 100%)'}
        })

        return{
            style
        }
    }
}