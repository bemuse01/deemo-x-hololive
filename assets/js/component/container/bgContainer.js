export default {
    template: `
        <transition >
            <div id="bg-container">
                <div class="bg-img" :style="imgStyle"></div>
                <div class="bg-overlay" :style="overlayStyle"></div>
            </div>
        </transition>
    `,
    setup(){
        const {computed, watch} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const playlist = computed(() => store.getters['playlist/getPlayer'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        // const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const crtSong = computed(() => playlist.value.getSong(crtKey.value))

        console.log('work')


        // style
        const imgStyle = computed(() => {
            if(crtSong.value.isDefault){
                return {background: 'none'}
            }else{
                if(+crtSong.value.type === 0) return {background: 'black'}
                else return {background: `url('${crtSong.value.bgPath}') no-repeat center center / cover`}
            }
        })
        const overlayStyle = computed(() => {
            if(crtSong.value.isDefault) return {background: 'none'}
            else return {background: `rgba(0, 0, 0, 0.8)`}
        })


        // watch
        watch(crtSong, (cur, pre) => {
            console.log(cur)
        })


        return{
            imgStyle,
            overlayStyle
        }
    }
}