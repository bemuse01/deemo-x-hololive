export default {
    template: `
        <div
            id="clicker-container"
            :style="containerStyle"
        >

            <span>
                CLICK ANYWHERE
            </span>

        </div>
    `,
    setup(){
        const {ref, onMounted, onBeforeMount} = Vue


        // style
        const containerStyle = ref({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            fontFamily: 'CanelaBold',
            fontSize: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
        })


        // event
        const init = () => {
        }


        // hook
        onBeforeMount(() => {
        })
        onMounted(() => {
        })


        return{
            containerStyle,
        }
    }
}