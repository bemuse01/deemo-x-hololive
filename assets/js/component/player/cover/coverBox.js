export default {
    template: `
        <div 
            class="cover-box"
            :style="boxStyle"
        >
        </div>
    `,
    setup(){
        const {ref} = Vue


        // style
        const boxStyle = ref({
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'black'
        })

        return{
            boxStyle
        }
    }
}