const getTranslateY = (len, key) => {
    return -100 / len * key
}

export default {
    template: `
        <div class="ui-container playlist-bg-container" :style="style">
            <div
                v-for="item in items"
                :key="item.key"
                :style="item.style"
            >
            </div>
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const songs = computed(() => store.getters['playlist/getSongs'].list)
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))

        const style = computed(() => ({
            transform: `translate(0, ${getTranslateY(songs.value.length, crtKey.value)}%)`,
            filter: crtItem.value.isDefault ? 'none' : 'brightness(1.15)'
        }))

        let loadedCount = 0

        const loadImg = () => {
            loadedCount++
            if(loadedCount === songs.value.length){
                store.dispatch('playlist/setSrcLoaded', true)
            }
        }

        const items = computed(() => Array.from(songs.value, (item, key) => {
            const {bgPath, isDefault} = item

            const img = new Image()
            img.src = bgPath
            img.onload = loadImg

            const overlay = isDefault ? 'transparent' : 'rgba(0, 0, 0, 1)'

            const style = {
                background: `linear-gradient(to right, ${overlay}, 30%, transparent), url('${bgPath}') no-repeat center center / cover`,
            }

            return {key, style}
        }))

        return{
            style,
            items
        }
    }
}