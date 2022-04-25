export default {
    template: `
        <div id="canvas-container" :style="style">
            <canvas id="canvas"></canvas>
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const style = computed(() => {
            if(+crtItem.value.type === 2) return {filter: `drop-shadow(0 0 2px #${crtItem.value.color.toString(16)}) brightness(1.5)`}
            else return {filter: 'none'}
        })

        return{
            style
        }
    }
}