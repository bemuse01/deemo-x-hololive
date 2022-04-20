import Songs from "../../data/songs.js"

const setColor = (style, key) => {
    if(Songs[key].isDefault){
        style.container.color = 'black'
    }
    else{
        style.container.color = 'white'
    }
}

export default {
    template: `
        <div class="nav-composer" :style="style.container">
            
            <div class="composer-text">
                <span>
                    Composer:
                </span>
            </div>

            <div class="composer-current">
                <span>
                    {{crtComposer}}
                </span>
            </div>
        
        </div>
    `,
    setup(){
        const {ref, watchEffect, reactive} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const style = reactive({
            container: {color: 'black'}
        })
        const crtComposer = ref(Songs[store.getters['playlist/getCrtKey']].composer)

        watchEffect(() => {
            const key = store.getters['playlist/getCrtKey']
            crtComposer.value = Songs[key].composer

            setColor(style, key)
        })

        return{
            style,
            crtComposer
        }
    }
}