import * as THREE from '../../../lib/three.module.js'
import Particle from '../../objects/particle.js'
import Shader from '../shader/particle.child.shader.js'

export default class{
    constructor({group, size, color}){
        this.group = group
        this.size = size

        this.param = {
            count: 800,
            color,
        }

        this.velocity = Array.from({length: this.param.count}, () => ({vx: THREE.Math.randFloat(0.2, 0.6), vy: -THREE.Math.randFloat(0.25, 0.5)}))

        this.init()
    }


    // init
    init(){
        this.create()
    }

    
    // create
    create(){
        this.object = new Particle({
            count: this.param.count,
            materialName: 'ShaderMaterial',
            materialOpt: {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                // depthWrite: false,
                // depthTest: false,
                uniforms: {
                    uColor: {value: new THREE.Color(this.param.color)}
                }
            }
        })

        const {position, size} = this.createAttribute()

        this.object.setAttribute('position', new Float32Array(position), 3)
        this.object.setAttribute('aPointSize', new Float32Array(size), 1)

        this.group.add(this.object.get())
    }
    createAttribute(){
        const position = []
        const size = []

        const {w, h} = this.size.obj

        const wh = w / 2
        const hh = h / 2

        for(let i = 0; i < this.param.count; i++){
            const x = Math.random() * w - wh
            const y = Math.random() * h - hh
            
            position.push(x, y, 0)
            size.push(THREE.Math.randFloat(0.1, 4))
        }

        return {position, size}
    }


    // dispose()
    dispose(){
        this.group.clear()

        this.object.dispose()
    }


    // resize
    resize(size){
        this.size = size
    }


    // animate
    animate({audioDataAvg}){
        let data = audioDataAvg
        if(!data) data = 0

        const {w, h} = this.size.obj
        
        const wh = w / 2
        const hh = h / 2

        const position = this.object.getAttribute('position')
        const posArr = position.array

        for(let i = 0; i < position.count; i++){
            const idx = i * 3

            const {vx, vy} = this.velocity[i]

            const x = posArr[idx + 0]
            const y = posArr[idx + 1]

            // posArr[idx + 0] += vx + vx * data * 4
            posArr[idx + 0] += vx * data * 5
            posArr[idx + 1] += vy

            if(x > wh) posArr[idx + 0] -= w
            if(x < -wh) posArr[idx + 0] += w
            if(y > hh) posArr[idx + 1] -= h
            if(y < -hh) posArr[idx + 1] += h 
        }

        position.needsUpdate = true
    }
}