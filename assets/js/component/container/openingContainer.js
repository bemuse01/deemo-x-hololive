export default {
    components: {
    },
    template: `
        <div
            id="opening-container"
            class="ui ui-open"
        >

            <div class="open-logo-box">

                <logo-deemo />
                <logo-hololive />

            </div>
        
        </div>
    `,
    setup(){
        const {computed, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const showing = computed(() => store.getters['open/getShowing'])
        const anims = computed(() => store.getters['open/getAnim'])

        const hide = () => {
            store.dispatch('open/setShowing', false)
        }

        watchEffect(() => {
            for(const anim in anims.value){
                if(!anims.value[anim]) return
            }

            hide()
        })

        return{
            showing
        }
    }
}