const checkTime = (time) => {
    return time < 10 ? '0' + time : time
}

export default {
    template: `
        <div class="song-info">
                    
            <div class="song-title-box">
                
                <div class="song-bg">
                    <img src="./assets/src/img/song_select_namebar.png">
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
                    <img src="./assets/src/img/song_select_scorebar_easy.png">
                </div>
                
                <div class="song-text">

                    <div class="song-length">
                        <span>{{crtDuration}}</span>
                    </div>
                
                </div>
                
            </div>

        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const crtDuration = computed(() => {
            const len = crtItem.value.length
            if(crtItem.value.isDefault) return len
            else{
                const min = ~~(len / 60)
                const sec = ~~(len % 60)
                return `${checkTime(min)}:${checkTime(sec)}`
            }
        })
        
        return{
            crtItem,
            crtDuration
        }
    }
}