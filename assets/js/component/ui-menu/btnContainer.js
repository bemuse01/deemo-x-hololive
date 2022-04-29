// import SongBtn from './songBtn.js'
// import HomeBtn from './homeBtn.js'
// import VolumeBtn from './volumeBtn.js'

const BtnContainer = {
    components: {
        'song-btn': SongBtn,
        'home-btn': HomeBtn,
        'volume-btn': VolumeBtn
    },
    template: `
        <div 
            class="ui-container menu-btn-container" 
            v-show="!crtItem.isDefault"
            :style="style"
        >

            <song-btn />
            <volume-btn />
            <home-btn />

        </div>
    `,
    setup(){
        const {computed, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const playing = computed(() => store.getters['playlist/getPlaying'])
        const scale = computed(() => store.getters['getScale'])
        const style = computed(() => ({
            transform: `scale(${scale.value})`
        }))

        watch(playing, (cur) => {
            if(cur) store.dispatch('menu/setIsPlaying', true)
        })

        watch(crtItem, () => {
            store.dispatch('menu/setIsPlaying', true)
        })

        return{
            crtItem,
            style
        }
    }
}