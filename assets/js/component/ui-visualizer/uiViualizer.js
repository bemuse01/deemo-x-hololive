import v2Container from './v2Container.js'

export default {
    components: {
        'v2-container': v2Container
    },
    template: `
        <div class="ui ui-visualizer" @click="click">

        <transition name="fade">
            <v2-container v-if="type === 2"></v2-container>
        </transition>

        </div>
    `,
    setup(){
        const {computed, ref, watch} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const songs = computed(() => store.getters['playlist/getSongs'])
        const playing = computed(() => store.getters['playlist/getPlaying'])
        const audio = computed(() => store.getters['getAudio'])
        const type = computed(() => {
            if(crtItem.value.isDefault) return 3
            else{
                if(playing.value) return +crtItem.value.type
                else return 3
            }
        })

        watch(playing, (cur, pre) => {
            if(cur){
                // console.log(audio.value.audio.paused)
                // audio.value.play()
            }
        })

        const click = () => {
            store.dispatch('playlist/setPlaying', false)
            songs.value.stopAudio(crtKey.value, true)
        }

        return{
            type,
            click
        }
    }
}