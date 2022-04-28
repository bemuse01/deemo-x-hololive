export default {
    template: `
        <div id="canvas-container" :style="style">
            <canvas id="canvas"></canvas>
        </div>
    `,
    setup(){
        const {computed, ref, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const loadingDelay = store.getters['loading/getLoadingDelay']
        const needsShow = ref(false)
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const playing = computed(() => store.getters['playlist/getPlaying'])
        const style = computed(() => {
            if(+crtItem.value.type === 2 && (playing.value || needsShow.value)) return {
                filter: `
                    drop-shadow(0 0 2px #${crtItem.value.color.toString(16)}) 
                    drop-shadow(0 0 2px #${crtItem.value.color.toString(16)}) 
                    brightness(1.5)
                `
            }
            else return {filter: 'none'}
        })

        const show = () => {
            needsShow.value = true
        }

        const hide = () => {
            needsShow.value = false
        }

        watch(playing, (cur, pre) => {
            if(cur){
                show()
            }else{
                setTimeout(() => hide(), loadingDelay)
            }
        })


        return{
            style
        }
    }
}