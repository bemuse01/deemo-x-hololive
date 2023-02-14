export default {
    template: `
        <div class="menu-btn volume-btn" @click="setVolume">
            <div>
                <img src="./assets/src/img/pause_btn_volume.png">
            </div>
            <div>
                <span>{{crtVolume}}</span>
            </div>
        </div>
    `,
    setup(){
        const {computed, ref} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const songs = computed(() => store.getters['playlist/getPlayer'])
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const volumes = [0, 0.25, 0.5, 0.75, 1]
        const idx = ref(volumes.length - 1)
        const crtVolume = computed(() => volumes[idx.value] * 100)

        const setVolume = () => {
            idx.value = (idx.value + 1) % volumes.length
            songs.value.setVolume(crtVolume.value / 100, crtKey.value)
        }

        return{
            setVolume,
            crtVolume
        }
    }
}