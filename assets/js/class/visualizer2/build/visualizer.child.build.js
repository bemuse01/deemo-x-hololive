import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
import Spline from '../../../lib/cubic-spline.js'
import Line from '../../objects/line.js'

export default class{
    constructor({group, radius}){
        this.group = group

        this.param = {
            radius: radius,
            count: 90,
            gap: 0,
            linewidth: 2,
            color: 0xffffff,
            step: 80,
            boost: 6,
            smooth: 0.25
        }

        this.deg = 360 / this.param.count
        this.display = this.param.count / 2
        this.index = Array.from({length: this.display}, (_, i) => i * 1.25)

        this.objects = []
        this.oPos = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        for(let i = 0; i < this.param.count; i++){
            const object = new Line({
                materialName: 'LineBasicMaterial',
                materialOpt: {
                    color: this.param.color,
                    transparent: true,
                    opacity: 1,
                    depthWrite: false,
                    depthTest: false
                    // blending: THREE.MultiplyBlending
                }
            })

            const position = this.createPosition(i)

            object.setAttribute('position', new Float32Array(position), 3)

            this.objects.push(object)

            this.group.add(object.get())
        }
    }
    createPosition(key){
        const position = Array.from({length: 5 * 3}, _ => 0)

        this.setPosition(position, key)

        return position
    }
    setPosition(position, key, size = 0){
        const {radius, gap} = this.param
        const deg = this.deg
        const last = (position.length / 3 - 1) * 3
        let index = 0

        for(let j = 0; j < 2; j++){
            const idx = index++ * 3
            const degree = key * deg + j * deg

            const x = Math.cos(degree * RADIAN) * (radius + (size + gap)) 
            const y = Math.sin(degree * RADIAN) * (radius + (size + gap)) 

            position[idx + 0] = x
            position[idx + 1] = y
        }

        for(let j = 1; j >= 0; j--){
            const idx = index++ * 3
            const degree = key * deg + j * deg

            const x = Math.cos(degree * RADIAN) * (radius - (size + gap)) 
            const y = Math.sin(degree * RADIAN) * (radius - (size + gap)) 

            position[idx + 0] = x
            position[idx + 1] = y
        }

        position[last + 0] = position[0]
        position[last + 1] = position[1]
    }

    
    // dispose
    dispose(){
        this.group.clear()
        this.objects.forEach(object => object.dispose())
        this.objects.length = 0
    }


    // animate
    animate({audioData}){
        if(!audioData) return 

        const sample = Array.from({length: this.display}, (_, i) => audioData[i * this.param.step] / 255)
        const data = this.createAudioData({sample, smooth: this.param.smooth})

        this.group.children.forEach((mesh, key) => {
            const geometry = mesh.geometry
            const position = geometry.attributes.position

            const size = data[key] * 5

            this.setPosition(position.array, key, size)

            position.needsUpdate = true
        })
    }
    createAudioData({sample, smooth}){
        const len = sample.length
        let temp = []

        const xs = this.index
        const ys = sample
        const spline = new Spline(xs, ys)
        let sum = 0 
        
        for(let i = 0; i < len; i++){
            const v = spline.at(i * smooth)
            sum += v
            temp.push(v)
        }
        
        const avg = (sum / len) * 1
        temp = temp.map(e => Math.max(0, e - avg) * this.param.boost)

        return [...temp, ...temp]
    }
}