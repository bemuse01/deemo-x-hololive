import * as THREE from '../../../lib/three.module.js'
import Shader from '../shader/visualizer.tunnel.shader.js'
import Ring from '../../objects/ring.js'

export default class{
    constructor({group, color, radius}){
        this.group = group

        const c = new THREE.Color(color)
        const {h, s, l} = c.getHSL({})
        const c1 = new THREE.Color().setHSL(h, s * 1.2, l * 0.556)
        const c2 = new THREE.Color().setHSL(h, s * 0.857, l * 0.889)
        const c3 = new THREE.Color().setHSL(h, s * 1.5, l * 1.223)

        this.param = [
            {
                color: c1,
                radius: radius + 0.7,
                thickness: 15,
                seg: 128,
                opacity: 0.75,
                needsShader: true
            },
            {
                color: c2,
                radius: radius,
                thickness: 0.4,
                seg: 128,
                needsShader: false
            },
            {
                color: c3,
                radius: radius + 0.7,
                thickness: 0.3,
                seg: 128,
                needsShader: false
            },
        ]

        this.darkMaterial = new THREE.MeshBasicMaterial({transparent: true, color: 0x000000})
        this.objects = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.param.forEach((param, i) => {
            const {color, radius, thickness, seg, needsShader, opacity} = param

            const materialOpt = needsShader ? {
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                blending: THREE.AdditiveBlending,
                uniforms: {
                    uColor: {value: color},
                    uOpacity: {value: opacity}
                }
            } : {
                transparent: true,
                // blending: THREE.AdditiveBlending,
                color
            }

            this.objects[i] = new Ring({
                innerRadius: radius,
                outerRadius: radius + thickness,
                seg,
                materialOpt
            })

            if(needsShader){
                const count = this.objects[i].getGeometry().attributes.position.count
                this.objects[i].setAttribute('aOpacity', new Float32Array(Array.from({length: count}, (_, i) => i < count / 2 ? 1 : 0)), 1)
            }

            this.group.add(this.objects[i].get())
        })
    }


    // dispose
    dispose(){
        this.group.clear()

        this.objects.forEach(object => object.dispose())
        this.objects.length = 0
        
        this.darkMaterial.dispose()
    }


    // swap material to avoding bloom
    setMaterial(){
        this.objects.forEach(object => {
            object.setMaterial(this.darkMaterial) 
        })
    }
    restoreMaterial(){
        this.objects.forEach(object => {
            object.setMaterial(object.getMaterial())
        })
    }
}