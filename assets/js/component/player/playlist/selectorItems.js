import {selectorWidth, selectorHeight} from '../../../config.js'
import {playlist} from '../../../data/data.js'

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

const getOpacity = ({musics, len, current, key}) => {
    let max = musics[current].isDefault ? 0.6 : 0.8
    const o = max / len
    const sub = Math.abs(current - key)
    const opacity = max - o * sub
    return opacity
}

export default {
    template: `
        <div 
            class="selector-items"
            :style="itemsStyle"
        >
            
            <div 
                class="selector-item"
                :style="itemStyle"
                v-for="item in items"
                :key="item.key"
            >
                <div 
                    class="nav-item-translate" 
                    :style="item.style.wrapper"
                >
                    <span
                        @click="onClickItem(item.key)"
                        :style="item.style.name"
                    >
                        {{item.name}}
                    </span>
                </div>
            </div>
        
        </div>
    `,
    setup(){
        const {ref, computed} = Vue
        const {useStore} = Vuex


        // store
        const store = useStore()
        const musics = computed(() => playlist)
        const currentIdx = computed(() => store.getters['player/getCurrentIdx'])
        const isHome = computed(() => playlist[currentIdx.value].isHome)
        // const currentVisualizerType = computed(() => playlist[currentIdx.value].type)


        // variable
        const radius1 = 170
        const radius2 = 210
        const count = 14 // count must be even num
        const {upDegree, downDegree} = createDegree(count)
        const len = upDegree.length
        let canClick = true
        const items = ref(Array.from(musics.value, (music, key) => {
            const {name, audioPath} = music
            
            const deg = getDeg({current: currentIdx.value, key, upDegree, downDegree, count})
            const {x, y} = updatePosition({deg, radius1, radius2})

            const opacity = getOpacity({musics: musics.value, len, current: currentIdx.value, key})
            const display = Math.abs(currentIdx.value - key) < len ? 'block' : 'none'

            const style = {
                wrapper: {
                    position: 'absolute',
                    transform: `translate(${x}px, ${y}px)`,
                    opacity: `${opacity}`,
                    cursor: 'pointer',
                    display
                },
                name: {
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)'
                }
            }
            
            return {key, name, style, deg, opacity, audioPath}
        }))


        // style
        const itemsStyle = computed(() => ({
            color: isHome.value ? 'black' : 'white',
            transition: 'color 0.3s',
            width: selectorWidth,
            height: selectorHeight,
            fontSize: '26px',
            whiteSpace: 'nowrap'
        }))
        const itemStyle = ref({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        })



        // methods
        const setCurrentIdx = (currentIdx) => {
            store.dispatch('player/setCurrentIdx', currentIdx)
        }
        const setVisualizerType = (currentIdx) => {
            store.dispatch('player/setVisualizerType', playlist[currentIdx].type)
        }
        const initTween = (key) => {
            items.value.forEach((_, idx) => createTween(key, idx))
        }
        const createTween = (key, idx) => {
            const item = items.value[idx]

            const oldDeg = item.deg
            const newDeg = getDeg({current: key, key: idx, upDegree, downDegree, count})

            const oldOpacity = item.opacity
            const newOpacity = getOpacity({musics: musics.value, len, current: key, key: idx})

            const start = {deg: oldDeg, opacity: oldOpacity}
            const end = {deg: newDeg, opacity: newOpacity}

            const tw = new TWEEN.Tween(start)
            .to(end, 600)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onStart(() => onStartTween(item, key, idx))
            .onUpdate(() => onUpdateTween(item, start))
            .onComplete(() => onCompleteTween(item, newDeg, newOpacity, key, idx))
            .start()
        }
        const onStartTween = (item, key, idx) => {
            if(Math.abs(key - idx) < len){
                item.style.wrapper.display = 'block'
            }
        }
        const onUpdateTween = (item, {deg, opacity}) => {
            const {x, y} = updatePosition({deg, radius1, radius2})
            item.style.wrapper.transform = `translate(${x}px, ${y}px)`
            item.style.wrapper.opacity = `${opacity}`
        }
        const onCompleteTween = (item, newDeg, newOpacity, key, idx) => {
            if(Math.abs(key - idx) >= len){
                item.style.wrapper.display = 'none'
            }
            item.deg = newDeg
            item.opacity = newOpacity
            canClick = true
        }
        const onClickItem = (key) => {
            if(!canClick) return

            canClick = false
                       
            setCurrentIdx(key)
            setVisualizerType(key)
            initTween(key)
        }


        return{
            itemsStyle,
            itemStyle,
            items,
            onClickItem
        }
    }
}