import Songs from '../../data/songs.js'

const getDeg = ({degree, deg, offset, key}) => {
    return (offset + degree) - deg * key
}

export default {
    template: `
        <div class="nav-background">
        
            <div class="nav-background-child flare">
                <img src="./assets/src/songselect_flare.png">
            </div>

            <div class="nav-background-child flare-beam">
                <div :style="style.flareBeam">
                    <img src="./assets/src/songselect_flare_beam.png">
                </div>
            </div>
            
        </div>
    `,
    setup(){
        const {reactive, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const degree = 120
        const offset = (180 -  degree) / 2
        const songCount = Songs.length
        const deg = degree / (songCount - 1)
        const style = reactive({
            flareBeam: {transform: `rotate(${getDeg({degree, deg, offset, key: store.getters['playlist/getCrtMusicKey']})}deg)`}
        })

        const updateTransform = (key) => {
            const newDeg = getDeg({degree, deg, offset, key})
            style.flareBeam.transform = `rotate(${newDeg}deg)`
        }
        
        watchEffect(() => {
            updateTransform(store.getters['playlist/getCrtMusicKey'])
        })

        return{
            style
        }
    }
}