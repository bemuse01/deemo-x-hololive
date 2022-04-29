const ComposerContainer = {
    template: `
        <div class="ui-container playlist-composer-container" :style="style">
            
            <div class="composer-text">
                <span>
                    Composer:
                </span>
            </div>

            <div class="composer-current">
                <span>
                    {{crtItem.composer}}
                </span>
            </div>
        
        </div>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const scale = computed(() => store.getters['getScale'])
        const style = computed(() => ({
            color: crtItem.value.isDefault ? 'black' : 'white',
            transform: `scale(${scale.value})`
        }))

        return{
            style,
            crtItem
        }
    }
}