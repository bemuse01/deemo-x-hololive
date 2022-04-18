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
                            <span>Demonic Pray</span>
                        </div>

                        <div class="song-vocal">
                            <span>Easy LV4</span>
                        </div>

                    </div>
                
                </div>

                <div class="song-length-box">
                
                    <div class="song-bg">
                        <img src="./assets/src/songselect_scorebar_easy.png">
                    </div>
                    
                    <div class="song-text">

                        <div class="song-length">
                            <span>00:00</span>
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
        
    }
}