import AppStore from './app.js'
import ResourceStore from './resource.js'
import PlayerStore from './player.js'

export default Vuex.createStore({
    modules: {
        app: AppStore,
        resource: ResourceStore,
        player: PlayerStore
    }
})