import Songs from '../../data/songs.js'

export default {
    template: `
        <div class="song-info">
                    
            <div class="song-title-box">
                
                <div class="song-bg">
                    <img src="./assets/src/songselect_namebar.png">
                </div>
                
                <div class="song-text song-text-title">
                    
                    <div class="song-name">
                        <span>{{crtItem.name}}</span>
                    </div>

                    <div class="song-vocal">
                        <span>{{crtItem.vocal}}</span>
                    </div>

                </div>
            
            </div>

            <div class="song-length-box">
            
                <div class="song-bg">
                    <img src="./assets/src/songselect_scorebar_easy.png">
                </div>
                
                <div class="song-text">

                    <div class="song-length">
                        <span>{{crtItem.length}}</span>
                    </div>
                
                </div>
                
            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtItem = ref()
        
        const setCurrentItem = () => {
            const crtKey = store.getters['playlist/getCrtKey']
            crtItem.value = Songs[crtKey]
        }

        watchEffect(() => {
            setCurrentItem()
        })

        onMounted(() => {
            setCurrentItem()
        })

        return{
            crtItem
        }
    }
}