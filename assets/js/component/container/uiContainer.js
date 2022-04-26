import UiOpen from "../ui-open/uiOpen.js"
import UiPlaylist from "../ui-playlist/uiPlaylist.js"
import UiViualizer from "../ui-visualizer/uiViualizer.js"

export default {
    components: {
        'ui-open': UiOpen,
        'ui-playlist': UiPlaylist,
        'ui-visualizer': UiViualizer
    },
    template: `
        <div id="ui-container">

            <ui-open></ui-open>
            <ui-visualizer></ui-visualizer>
            <ui-playlist></ui-playlist>

        </div>
    `
}