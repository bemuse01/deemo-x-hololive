import * as THREE from '../../../lib/three.module.js'
import Circle from '../../objects/circle.js'
import Spline from '../../../lib/cubic-spline.js'

export default class{
    constructor({group, color, radius, scale}){
        this.scale = scale
        this.group = group

        this.param = {
            radius,
            seg: 128 - 1,
            color,
            smooth: 0.25,
            step: 128,
            boost: 2
        }


        this.display = this.param.seg + 1
        this.index = Array.from({length: this.display / 2}, (_, i) => i * 1.25)

        const c = new THREE.Color(this.param.color)
        const {h, s} = c.getHSL({})
        const sColor = new THREE.Color().setHSL(h, s, 0.2)
        const eColor = new THREE.Color().setHSL(h, s, 0.4)

        this.colors = Array.from({length: 3}, (_, i) => new THREE.Color().lerpColors(sColor, eColor, 1 / 2 * i))
        this.colors.push(new THREE.Color(0x000000))

        this.objects = []
        this.oPosition = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.colors.forEach((color, i) => {

            const object = new Circle({
                radius: this.param.radius,
                seg: this.param.seg,
                materialName: 'MeshBasicMaterial',
                materialOpt: {
                    // depthTest: false,
                    // depthWrite: false,
                    color: color
                }
            })

            if(i === 0) this.oPosition = [...object.getAttribute('position').array]

            object.get().rotation.z = 90 * RADIAN

            this.group.add(object.get())

            this.objects.push(object)

            this.group.position.z = 0.1

        })
    }


    // dispose()
    dispose(){
        this.group.clear()

        this.objects.forEach(object => object.dispose())
        this.objects.length = 0
    }


    // animate
    animate({audioData, audioDataAvg}){
        let data = audioDataAvg || 0
        if(!audioData) return 

        const scale = 1 + data * this.scale

        this.group.scale.set(scale, scale, 1)
        
        const sample = Array.from({length: this.display / 2}, (_, i) => audioData[i * this.param.step] / 255)
        const oPos = this.oPosition
        const len = this.group.children.length

        this.group.children.forEach((mesh, key) => {
            const geometry = mesh.geometry
            const position = geometry.attributes.position
            const posArr = position.array
            const step =  (len - key) * (audioDataAvg * 0.2)
            const smooth = 0.2 + key * 0.005
            const data = this.createAudioData({sample, smooth})

            for(let i = 1; i < position.count; i++){
                const idx = i * 3

                const x = oPos[idx + 0]
                const y = oPos[idx + 1]

                posArr[idx + 0] = x + x * data[i - 1] * (0.5 + step)
                posArr[idx + 1] = y + y * data[i - 1] * (0.5 + step)
            }

            position.needsUpdate = true
        })
    }
    createAudioData({sample, smooth}){
        const len = sample.length
        let temp = []

        const xs = this.index
        const ys = sample
        ys[0] = 0

        const spline = new Spline(xs, ys)
        
        for(let i = 0; i < len; i++){
            temp.push(spline.at(i * smooth))
        }
        
        const avg = (temp.reduce((x, y) => x + y) / len) * 0.9
        temp = temp.map(e => Math.max(0, e - avg) * this.param.boost)

        const reverse = [...temp]
        reverse.reverse()

        return [...temp, ...reverse]
    }
}