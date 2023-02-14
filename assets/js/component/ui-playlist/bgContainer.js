const getTranslateY = (len, key) => {
    return (-100 / len) * key
}

export default {
    template: `
        <div class="ui-container playlist-bg-container" :style="containerStyle">
            <div
                v-for="bg in bgs"
                :key="bg.key"
                :style="bg.style"
            >
            </div>
        </div>
    `,
    setup(){
        const {computed, watch} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const player = computed(() => store.getters['playlist/getPlayer'])
        const songs = computed(() => player.value.getSongs())
        const crtSong = computed(() => player.value.getSong(crtKey.value))
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])


        // variable
        const bgs = computed(() => Array.from(songs.value, ({isDefault, bgPath}, key) => {
            const overlay = isDefault ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'
            return{
                key,
                style: {
                    background: `linear-gradient(to right, ${overlay}, 30%, transparent), url('${bgPath}') no-repeat center center / cover`
                }
            }
        }))

        
        // style
        const containerStyle = computed(() => ({
            position: 'relative',
            transform: `translate(0, ${getTranslateY(songs.value.length, crtKey.value)}%)`,
            filter: crtSong.value.isDefault ? 'none' : 'brightness(1.15)'
        }))


        return{
            containerStyle,
            bgs
        }
    }
}