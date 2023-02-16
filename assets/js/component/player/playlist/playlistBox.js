import PlaylistBg from './playlistBg.js'
import PlaylistSelector from './playlistSelector.js'

export default {
    components: {
        'playlist-bg': PlaylistBg,
        'playlist-selector': PlaylistSelector
    },
    template: `
        <div
            class="playlist-box"
            :style="boxStyle"
        >

            <playlist-bg />
            <playlist-selector />
        
        </div>
    `,
    setup(){
        const {ref} = Vue


        // style
        const boxStyle = ref({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            fontFamily: 'FANTIQUE'
        })


        return{
            boxStyle
        }
    }
}