import * as THREE from '../../../lib/three.module.js'
import Ring from '../../objects/ring.js'

export default class{
    constructor({group, color, radius}){
        this.group = group

        const c = new THREE.Color(color)
        const {h, s, l} = c.getHSL({})

        const c1 = new THREE.Color().setHSL(h, s * 0.857, l * 0.778)

        this.param = {
            count: 3,
            radius: radius + 0.9,
            thickness: 0.3,
            seg: 360,
            color: c1
        }

        this.max = this.param.seg / this.param.count
        this.objects = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        for(let i = 0; i < this.param.count; i++){
            const deg = 360 / this.param.count * i

            this.objects[i] = new Ring({
                innerRadius: this.param.radius - this.param.thickness / 2,
                outerRadius: this.param.radius + this.param.thickness / 2,
                seg: this.param.seg,
                materialOpt: {
                    color: this.param.color,
                    transparent: true,
                    // opacity: 0.5,
                    // blending: THREE.AdditiveBlending
                }
            })

            this.objects[i].getGeometry().setDrawRange(0, 0)

            this.objects[i].get().rotation.z = deg * RADIAN

            this.group.add(this.objects[i].get())
        }
    }


    // dispose
    dispose(){
        this.group.clear()
        this.objects.forEach(object => object.dispose())
        this.objects.length = 0
    }


    // animate
    animate({audioData, audioDataAvg}){
        this.group.rotation.z += 0.01

        if(audioData){
            const data = ~~(audioDataAvg * this.max)

            for(let i = 0; i < this.param.count; i++){
                this.objects[i].getGeometry().setDrawRange(0, data * 2 * 3)
            }
        }
    }
}