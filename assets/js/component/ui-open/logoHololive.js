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
        const {reactive, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const style = reactive({
            container: {opacity: 0, transform: 'translate(0, 0)'}
        })

        const slide = () => {
            style.container.opacity = 1
            style.container.transform = 'translate(0, -50%)'
        }

        watchEffect(() => {
            if(!store.getters['open/getDeemoAnim']) return

            slide()
        })

        return{
            style
        }
    }
}