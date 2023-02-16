import PlaylistBg from './playlistBg.js'
import PlaylistSelector from './playlistSelector.js'
import PlaylistComposer from './playlistComposer.js'

export default {
    components: {
        'playlist-bg': PlaylistBg,
        'playlist-selector': PlaylistSelector,
        'playlist-composer': PlaylistComposer
    },
    template: `
        <div
            class="playlist-box"
            :style="boxStyle"
        >

            <playlist-bg />
            <playlist-selector />
            <playlist-composer />
        
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