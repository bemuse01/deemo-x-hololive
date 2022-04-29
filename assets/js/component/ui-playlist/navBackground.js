// import Songs from '../../data/songs.js'

// const getDeg = ({degree, deg, offset, key}) => {
//     return (offset + degree) - deg * key
// }

// const setOpacity = (style, key) => {
//     if(Songs[key].isDefault) style.container.opacity = '1'
//     else style.container.opacity = '0.25'
// }

const NavBackground = {
    template: `
        <div class="nav-background" :style="style.container">
        
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
        const getDeg = ({degree, deg, offset, key}) => {
            return (offset + degree) - deg * key
        }
        
        const setOpacity = (style, key) => {
            if(Songs[key].isDefault) style.container.opacity = '1'
            else style.container.opacity = '0.25'
        }




        const {reactive, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const degree = 120
        const offset = (180 -  degree) / 2
        const songCount = Songs.length
        const deg = degree / (songCount - 1)
        const style = reactive({
            container: {opacity: '1', transition: 'opacity 0.3s'},
            flareBeam: {transform: `rotate(${getDeg({degree, deg, offset, key: store.getters['playlist/getCrtKey']})}deg)`}
        })

        const updateTransform = (key) => {
            const newDeg = getDeg({degree, deg, offset, key})
            style.flareBeam.transform = `rotate(${newDeg}deg)`
        }
        
        watchEffect(() => {
            const key = store.getters['playlist/getCrtKey']
            updateTransform(key)
            setOpacity(style, key)
        })

        return{
            style
        }
    }
}