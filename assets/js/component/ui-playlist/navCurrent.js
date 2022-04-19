import NavCurrentInfo from './navCurrentInfo.js'
import NavCurrentDifficulty from './navCurrentDifficulty.js'

export default {
    components: {
        'nav-current-info': NavCurrentInfo,
        'nav-current-difficulty': NavCurrentDifficulty
    },
    template: `
        <div class="nav-current">
          
            <nav-current-info />
            <nav-current-difficulty />

        </div>
    `,
}