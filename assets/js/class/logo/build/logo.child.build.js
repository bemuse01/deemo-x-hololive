import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
import Shader from '../shader/logo.child.shader.js'
import Param from '../param/logo.child.param.js'

export default class{
    constructor({group, size, name, anim, src}){
        this.name = name
        this.anim = anim
        this.group = group
        this.size = size

        this.param = {
            blur: 0.25,
            count: Param.count,
            time: 3000,
            delayDefault: 500,
            delayStep: 0
        }

        // max width range and ratio
        this.ratio = this.size.obj.w / this.size.obj.h
        this.src = src

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const loader = new THREE.TextureLoader()

        const {randPosition, radius} = this.createUniforms()

        loader.load(this.src, (texture) => {

            this.object = new Plane({
                width: this.size.obj.w,
                height: this.size.obj.h,
                widthSeg: 1,
                heightSeg: 1,
                materialName: 'ShaderMaterial',
                materialOpt: {
                    vertexShader: Shader.vertex,
                    fragmentShader: Shader.fragment,
                    transparent: true,
                    uniforms: {
                        uTexture: {value: texture},
                        uRandPosition: {value: randPosition},
                        uRadius: {value: Array.from({length: this.param.count}, _ => 0)},
                        uBlur: {value: this.param.blur},
                        uRatio: {value: this.ratio}
                    }
                }
            })

            this.group.add(this.object.get())

            radius.forEach((e, i) => {
                this.createTween(e, i)
            })

        })
    }
    createUniforms(){
        const randPosition = []
        const radius = []

        for(let i = 0; i < this.param.count; i++){
            // rand position
            const randX = Math.random() * this.ratio - (this.ratio / 2)
            const randY = Math.random() * 2 - 1

            randPosition.push(new THREE.Vector2(randX, randY))


            // radius
            const startRadius = 0
            const endRadius = 1 + this.param.blur

            radius.push({startRadius, endRadius})
        }

        return {randPosition, radius}
    }


    // tween
    createTween(radius, idx){
        const {startRadius, endRadius} = radius
        const start = {radius: startRadius}
        const end = {radius: endRadius}
        const {time, delayDefault, delayStep} = this.param

        const tw = new TWEEN.Tween(start)
        .to(end, time)
        // .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => this.onUpdateTween(idx, start))
        .onComplete(() => this.onCompleteTween(idx))
        .delay(delayDefault + idx * delayStep)
        .start()
    }
    onUpdateTween(idx, {radius}){
        this.object.setUniform('uRadius', radius, idx)
    }
    onCompleteTween(idx){
        if(idx === this.param.count - 1){
            // animation is completed
            this.anim[this.name] = true
        }
    }


    // dispose
    dispose(){
        this.group.clear()
        this.object.dispose()
        this.object = null
    }


    // resize
    resize(size){
        this.size = size
    }
}