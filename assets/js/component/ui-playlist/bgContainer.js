import Songs from '../../data/songs.js'

const getTranslateY = (key) => {
    return -100 / Songs.length * key
}

const setBg = (style, key) => {
    const y = getTranslateY(key)
    style.container.transform = `translate(0, ${y}%)`

    if(Songs[key].isDefault) {
        style.container.filter = 'none'
    }
    else {
        style.container.filter = 'brightness(1.125)'
    }
}

export default {
    template: `
        <div class="ui-container playlist-bg-container" :style="style.container">
            <div
                v-for="item in items"
                :key="item.key"
                :style="item.style"
            >
            </div>
        </div>
    `,
    setup(){
        const {ref,reactive, watchEffect} = Vue
        const {useStore} = Vuex

        const store = useStore()

        const style = reactive({
            container: {
                transform: `translate(0, ${getTranslateY(store.getters['playlist/getCrtKey'])}%)`,
                filter: 'none'
            }
        })

        const items = ref(Array.from(Songs, (item, key) => {
            const {bgSrc, isDefault} = item

            const overlay = isDefault ? 'transparent' : 'rgba(0, 0, 0, 0.6)'

            const style = {
                background: `linear-gradient(to right, ${overlay}, transparent), url('${bgSrc}') no-repeat center center / cover`,
            }

            return {key, style}
        }))

        watchEffect(() => {
            const key = store.getters['playlist/getCrtKey']
            setBg(style, key)
        })

        return{
            style,
            items
        }
    }
}