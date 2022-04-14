const getDeg = ({degree, deg, offset, key}) => {
    return (offset + degree) - deg * key
}

export default {
    template: `
        <div class="nav-background">
        
            <div class="flare">
                <img src="./assets/src/songselect_flare.png">
            </div>

            <div class="flare-beam">
                <div :style="style.flareBeam">
                    <img src="./assets/src/songselect_flare_beam.png">
                </div>
            </div>
            
        </div>
    `,
    setup(){
        const {reactive, watch, computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const currentMusicKey = computed(() => store.getters['playlist/getCrtMusicKey'])
        const degree = 120
        const offset = (180 -  degree) / 2
        const musicCount = 14
        const deg = degree / (musicCount - 1)
        const style = reactive({
            flareBeam: {transform: `rotate(${degree + offset}deg)`}
        })

        const updateTransform = (key) => {
            const newDeg = getDeg({degree, deg, offset, key})
            style.flareBeam.transform = `rotate(${newDeg}deg)`
        }
        
        watch(currentMusicKey, cur => {
            updateTransform(cur)
        })

        return{
            style
        }
    }
}