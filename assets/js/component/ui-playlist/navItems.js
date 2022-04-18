import Songs from '../../data/songs.js'

const createDegree = (count) => {
    const len = ~~(count / 4)
    const degree = [0]
    const deg = 360 / count

    for(let i = 1; i < len + 1; i++){
        degree.push(deg * i)
    }

    return {upDegree: degree.map(e => -e), downDegree: degree}
}

const getDeg = ({current, key, upDegree, downDegree, count}) => {
    const sign = Math.sign(current - key)
    const degree = key < current ? upDegree : downDegree
    const edge = degree.length * (360 / count)
    const idx = Math.abs(current - key)
    const deg = idx < degree.length ? degree[idx] : edge * -sign

    return deg
}

const updatePosition = ({deg, radius1, radius2}) => {
    const x = Math.cos(deg * RADIAN) * radius1
    const y = Math.sin(deg * RADIAN) * radius2
    
    return {x, y}
}

const getOpacity = ({len, current, key}) => {
    const o = 0.6 / len
    const sub = Math.abs(current - key)
    const opacity = 0.6 - o * sub
    return opacity
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
        const {useStore} = Vuex


        // vars
        const store = useStore()
        const radius1 = 170
        const radius2 = 210
        const count = 14 // count must be even num
        const {upDegree, downDegree} = createDegree(count)
        const current = store.getters['playlist/getCrtMusicKey']
        let canClick = true

        const items = ref(Array.from(Songs, (song, key) => {
            const {name, src} = song
            
            const deg = getDeg({current, key, upDegree, downDegree, count})
            const {x, y} = updatePosition({deg, radius1, radius2})

            const opacity = getOpacity({len: upDegree.length, current, key})

            const style = {
                transform: `translate(${x}px, ${y}px)`,
                opacity: `${opacity}`
            }
            
            return {key, name, style, deg, opacity, src}
        }))


        // methods
        const initTween = (cur) => {
            if(!canClick) return
            canClick = false

            store.dispatch('playlist/setCrtMusicKey', cur)

            for(let i = 0; i < items.value.length; i++){
                createTween(cur, i)
            }
        }

        const createTween = (cur, idx) => {
            const item = items.value[idx]

            const oldDeg = item.deg
            const newDeg = getDeg({current: cur, key: idx, upDegree, downDegree, count})

            const oldOpacity = item.opacity
            const newOpacity = getOpacity({len: upDegree.length, current: cur, key: idx})

            const start = {deg: oldDeg, opacity: oldOpacity}
            const end = {deg: newDeg, opacity: newOpacity}

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => onUpdateTween(item, start))
            .onComplete(() => onCompleteTween(item, newDeg, newOpacity))
            .start()
        }

        const onUpdateTween = (item, {deg, opacity}) => {
            const {x, y} = updatePosition({deg, radius1, radius2})
            item.style.transform = `translate(${x}px, ${y}px)`
            item.style.opacity = `${opacity}`
        }

        const onCompleteTween = (item, newDeg, newOpacity) => {
            item.deg = newDeg
            item.opacity = newOpacity
            canClick = true
        }

        return{
            items,
            initTween
        }
    }
}