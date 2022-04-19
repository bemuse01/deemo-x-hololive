import Songs from '../../data/songs.js'

export default {
    template: `
        <div class="nav-current">

            <div class="song-info">
                
                <div class="song-title-box">
                    
                    <div class="song-bg">
                        <img src="./assets/src/songselect_namebar.png">
                    </div>
                    
                    <div class="song-text song-text-title">
                        
                        <div class="song-name">
                            <span>{{currentItem.name}}</span>
                        </div>

                        <div class="song-vocal">
                            <span>{{currentItem.vocal}}</span>
                        </div>

                    </div>
                
                </div>

                <div class="song-length-box">
                
                    <div class="song-bg">
                        <img src="./assets/src/songselect_scorebar_easy.png">
                    </div>
                    
                    <div class="song-text">

                        <div class="song-length">
                            <span>{{currentItem.length}}</span>
                        </div>
                    
                    </div>
                    
                </div>

            </div>

            <div class="nav-difficulty difficulty-bg">
                <img src="./assets/src/songselect_difficulty_bg_easy.png">
            </div>

            <div class="nav-difficulty difficulty">
                <img src="./assets/src/songselect_difficulty_easy.png">
            </div>

        </div>
    `,
    setup(){
        const {ref, onMounted, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const currentItem = ref()
        
        const setCurrentItem = () => {
            const currentKey = store.getters['playlist/getCrtMusicKey']
            currentItem.value = Songs[currentKey]
        }

        watchEffect(() => {
            setCurrentItem()
        })

        onMounted(() => {
            setCurrentItem()
        })

        return{
            currentItem
        }
    }
}