import UiOpen from "../ui-open/uiOpen.js"
import UiPlaylist from "../ui-playlist/uiPlaylist.js"
import UiViualizer from "../ui-visualizer/uiViualizer.js"
import UiMenu from "../ui-menu/uiMenu.js"

export default {
    components: {
        'ui-open': UiOpen,
        'ui-playlist': UiPlaylist,
        'ui-visualizer': UiViualizer,
        'ui-menu': UiMenu
    },
    template: `
        <div id="ui-container">

            <ui-open></ui-open>
            <ui-visualizer></ui-visualizer>
            <ui-playlist></ui-playlist>
            <ui-menu></ui-menu>

        </div>
    `
}