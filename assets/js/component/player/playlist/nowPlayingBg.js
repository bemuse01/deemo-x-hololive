import {imgPath} from '../../../config.js'

export default {
    template: `
        <div 
            class="nowPlaying-bg"
            :style="wrapperStyle"    
        >
                        
            <div 
                class="nowPlaying-bg1"
                :style="bgStyle"
            >
                <img src="${imgPath}song_select_difficulty_bg_easy.png">
            </div>

            <div 
                class="nowPlaying-bg2"
                :style="bgStyle"
            >
                <img src="${imgPath}song_select_difficulty_easy.png">
            </div>

        </div>
    `,
    setup(){
        const {ref} = Vue

        
        // style
        const wrapperStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%'
        })
        const bgStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%'
        })


        return{
            wrapperStyle,
            bgStyle,
        }
    }
}