import NavBackground from './navBackground.js'
import NavItems from './navItems.js'
import NavCurrent from './navCurrent.js'
import NavComposer from './navComposer.js'

export default {
    components: {
        'nav-background': NavBackground,
        'nav-items': NavItems,
        'nav-current': NavCurrent,
        'nav-composer': NavComposer
    },
    template: `
        <div class="ui-container playlist-nav-container">
            
            <nav-background class="nav-center" />
            <nav-items class="nav-center" />
            <nav-current class="nav-center" />
            <nav-composer />

        </div>
    `,
}