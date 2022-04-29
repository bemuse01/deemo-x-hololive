// import UiOpen from "../ui-open/uiOpen.js"
// import UiPlaylist from "../ui-playlist/uiPlaylist.js"
// import UiVisualizer from "../ui-visualizer/uiVisualizer.js"
// import UiMenu from "../ui-menu/uiMenu.js"

const UiContainer = {
    components: {
        'ui-open': UiOpen,
        'ui-playlist': UiPlaylist,
        'ui-visualizer': UiVisualizer,
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