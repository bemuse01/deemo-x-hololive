const createDegree = (count) => {
    const len = ~~(count / 4)
    const tDegree = []
    const bDegree = []
    const deg = 360 / count

    for(let i = count - len; i < count; i++){
        tDegree.push(deg * i)
    }
    tDegree.reverse()
    tDegree.unshift(0)

    for(let i = 1; i < len + 1; i++){
        bDegree.push(deg * i)
    }
    bDegree.unshift(0)

    return {tDegree, bDegree}
}

export default {
    template: `
        <div class="nav-item-box">
            
            <div 
                class="nav-item"
                v-for="item in items"
                :key="item.key"
            >
                <div 
                    class="nav-item-translate" 
                    :style="item.style"
                >
                    <span>{{item.name}}</span>
                </div>
            </div>
        
        </div>
    `,
    setup(){
        const {reactive, ref} = Vue

        const text = 'abcdef'
        const radius1 = 150
        const radius2 = 200
        // count must be even num
        const count = 18
        const {tDegree, bDegree} = createDegree(count)
        const current = 16

        console.log(tDegree, bDegree)

        const items = ref(Array.from({length: count}, (_, key) => {
            const name = 'xxxxx'.replace(/x/g, () => text[~~(Math.random() * text.length)])
            
            const degree = key < current ? tDegree : bDegree
            const idx = Math.abs(current - key)
            const deg = idx < degree.length ? degree[idx] : 180

            const x = Math.cos(deg * RADIAN) * radius1
            const y = Math.sin(deg * RADIAN) * radius2
            
            const style = {
                transform: `translate(${x}px, ${y}px)`
            }
            
            return {key, name, style}
        }))

        return{
            items
        }
    }
}