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

const getOpacity = ({songs, len, current, key}) => {
    let max = songs[current].isDefault ? 0.6 : 0.8
    const o = max / len
    const sub = Math.abs(current - key)
    const opacity = max - o * sub
    return opacity
}

const setColor = (songs, style, key) => {
    if(songs[key].isDefault){
        style.color = 'black'
    }
    else{
        style.color = 'white'
    }
}

export default {
    template: `
        <div class="nav-item-box" :style="boxStyle">
            
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
        const {ref, computed} = Vue
        const {useStore} = Vuex


        // vars
        const store = useStore()
        const boxStyle = ref({color: 'black', transition: 'color 0.3s'})
        const songs = computed(() => store.getters['playlist/getSongs'].list)
        const radius1 = 170
        const radius2 = 210
        const count = 14 // count must be even num
        const {upDegree, downDegree} = createDegree(count)
        const len = upDegree.length
        const current = store.getters['playlist/getCrtKey']
        let canClick = true

        const items = ref(Array.from(songs.value, (song, key) => {
            const {name, songSrc} = song
            
            const deg = getDeg({current, key, upDegree, downDegree, count})
            const {x, y} = updatePosition({deg, radius1, radius2})

            const opacity = getOpacity({songs: songs.value, len, current, key})
            const display = Math.abs(current - key) < len ? 'block' : 'none'

            const style = {
                transform: `translate(${x}px, ${y}px)`,
                opacity: `${opacity}`,
                display
            }
            
            return {key, name, style, deg, opacity, songSrc}
        }))


        // methods
        const initTween = (cur) => {
            if(!canClick) return
            canClick = false

            setColor(songs.value, boxStyle.value, cur)

            store.dispatch('playlist/setCrtKey', cur)

            for(let i = 0; i < items.value.length; i++){
                createTween(cur, i)
            }
        }

        const createTween = (cur, idx) => {
            const item = items.value[idx]

            const oldDeg = item.deg
            const newDeg = getDeg({current: cur, key: idx, upDegree, downDegree, count})

            const oldOpacity = item.opacity
            const newOpacity = getOpacity({songs: songs.value, len, current: cur, key: idx})

            const start = {deg: oldDeg, opacity: oldOpacity}
            const end = {deg: newDeg, opacity: newOpacity}

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(() => onStartTween(item, cur, idx))
            .onUpdate(() => onUpdateTween(item, start))
            .onComplete(() => onCompleteTween(item, newDeg, newOpacity, cur, idx))
            .start()
        }

        const onStartTween = (item, cur, idx) => {
            if(Math.abs(cur - idx) < len){
                item.style.display = 'block'
            }
        }

        const onUpdateTween = (item, {deg, opacity}) => {
            const {x, y} = updatePosition({deg, radius1, radius2})
            item.style.transform = `translate(${x}px, ${y}px)`
            item.style.opacity = `${opacity}`
        }

        const onCompleteTween = (item, newDeg, newOpacity, cur, idx) => {
            if(Math.abs(cur - idx) >= len){
                item.style.display = 'none'
            }
            item.deg = newDeg
            item.opacity = newOpacity
            canClick = true
        }

        return{
            boxStyle,
            items,
            initTween
        }
    }
}