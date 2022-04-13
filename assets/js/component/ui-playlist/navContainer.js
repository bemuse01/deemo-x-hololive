import NavBackground from './navBackground.js'
import NavItems from './navItems.js'

export default {
    components: {
        'nav-background': NavBackground,
        'nav-items': NavItems
    },
    template: `
        <div class="ui-container playlist-nav-container">
            
            <nav-background />
            <nav-items />

        </div>
    `,
    
}