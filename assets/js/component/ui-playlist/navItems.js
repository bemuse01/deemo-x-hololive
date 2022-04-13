const createDegree = (count) => {
    const len = ~~(count / 4)
    const upDegree = []
    const downDegree = []
    const deg = 360 / count

    for(let i = count - len; i < count; i++){
        upDegree.push(deg * i)
    }
    upDegree.reverse()
    upDegree.unshift(0)

    for(let i = 1; i < len + 1; i++){
        downDegree.push(deg * i)
    }
    downDegree.unshift(0)

    return {upDegree, downDegree}
}

const getDeg = ({current, key, upDegree, downDegree}) => {
    const degree = key < current ? upDegree : downDegree
    const idx = Math.abs(current - key)
    const deg = idx < degree.length ? degree[idx] : 180

    return deg
}

const updatePosition = ({deg, radius1, radius2}) => {
    const x = Math.cos(deg * RADIAN) * radius1
    const y = Math.sin(deg * RADIAN) * radius2
    
    return {x, y}
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
                    <span
                        @click="initTween(item.key)"
                    >{{item.name}}</span>
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
        const {upDegree, downDegree} = createDegree(count)
        const current = 16

        const items = ref(Array.from({length: count}, (_, key) => {
            const name = 'xxxxx'.replace(/x/g, () => text[~~(Math.random() * text.length)])
            
            const deg = getDeg({current, key, upDegree, downDegree})
            const {x, y} = updatePosition({deg, radius1, radius2})
        
            const style = {
                transform: `translate(${x}px, ${y}px)`
            }
            
            return {key, name, style, deg}
        }))

        const initTween = (cur) => {
            for(let i = 0; i < items.value.length; i++){
                createTween(cur, i)
            }
        }

        const createTween = (cur, idx) => {
            const newDeg = getDeg({current: cur, key: idx, upDegree, downDegree})
            
            const item = items.value[idx]

            const start = {deg: item.deg}
            const end = {deg: newDeg}

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .onUpdate(() => onUpdateTween(item, start))
            .onComplete(() => onCompleteTween(item, newDeg))
            .start()
        }

        const onUpdateTween = (item, {deg}) => {
            const {x, y} = updatePosition({deg, radius1, radius2})
            item.style.transform = `translate(${x}px, ${y}px)`
        }

        const onCompleteTween = (item, newDeg) => {
            item.deg = newDeg
        }

        return{
            items,
            initTween
        }
    }
}