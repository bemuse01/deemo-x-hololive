import NavBackground from './navBackground.js'
import NavItems from './navItems.js'
import NavCurrent from './navCurrent.js'

export default {
    components: {
        'nav-background': NavBackground,
        'nav-items': NavItems,
        'nav-current': NavCurrent
    },
    template: `
        <div class="ui-container playlist-nav-container">
            
            <nav-background />
            <nav-items />
            <nav-current />

        </div>
    `,
}