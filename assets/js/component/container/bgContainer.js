export default {
    template: `
        <transition >
            <div id="bg-container">
                <div class="bg-img"></div>
                <div class="bg-overlay"></div>
            </div>
        </transition>
    `,
    setup(){
        const {useStore} = Vuex

        // const store = useStore()
        // const playing = computed(() => store.getters['playlist/getPlaying'])
        // const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        // const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        // const imgStyle = computed(() => ({
        //     background: `url('${crtItem.value.bgSrc}') no-repeat center center / cover`
        // }))


        return{
            // imgStyle
        }
    }
}