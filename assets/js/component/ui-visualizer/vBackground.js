export default {
    template: `
        <transition >
            <div class="ui-container visualizer-vBackground-container">
                <div class="bg-img" :style="imgStyle"></div>
                <div class="bg-overlay" :style="overlayStyle"></div>
            </div>
        </transition>
    `,
    setup(){
        const {computed} = Vue
        const {useStore} = Vuex

        const store = useStore()
        const crtKey = computed(() => store.getters['playlist/getCrtKey'])
        const crtItem = computed(() => store.getters['playlist/getSong'](crtKey.value))
        const imgStyle = computed(() => {
            if(crtItem.value.isDefault){
                return {background: 'none'}
            }else{
                return {background: `url('${crtItem.value.bgSrc}') no-repeat center center / cover`}
            }
        })
        const overlayStyle = computed(() => {
            if(crtItem.value.isDefault){
                return {background: 'none'}
            }else{
                return {background: `rgba(0, 0, 0, 0.8)`}
            }
        })

        return{
            imgStyle,
            overlayStyle
        }
    }
}