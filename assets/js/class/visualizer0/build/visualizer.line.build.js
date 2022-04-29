import * as THREE from '../../../lib/three.module.js'
import Ring from '../../objects/ring.js'
import Particle from '../../objects/particle.js'
import Shader from '../shader/visualizer.line.shader.js'

export default class{
    constructor({group, radius, color}){
        this.group = group

        this.param = {
            count: 3,
            radius: radius + 1,
            thickness: 0.3,
            seg: 360,
            color,
            pointSize: 4,
        }

        this.objects = []
        this.points = []
        this.currentData = 0

        this.max = this.param.seg / this.param.count
        this.limit = this.max * 0.5
        this.audioIsPlaying = false
        this.id = 0
        this.step = 5

        this.oldTime = window.performance.now()
        this.interval = 150

        this.darkMaterial = new THREE.MeshBasicMaterial({transparent: true, color: 0x000000})

        this.init()
    }


    // init
    init(){
        // setInterval(() => {
        //     if(this.audioIsPlaying){
        //         this.create()
        //     }
        // }, 200)
    }


    // create
    create(){
        const objects = []
        const points = []

        if(this.currentData === 0) return

        for(let i = 0; i < this.param.count; i++){
            const {radius, thickness, seg, color} = this.param

            const deg = 360 / this.param.count * i
            const currentData = this.currentData

            // line
            const object = new Ring({
                innerRadius: radius,
                outerRadius: radius + thickness,
                seg,
                materialOpt: {
                    color,
                    transparent: true,
                    opacity: 0,
                    blending: THREE.AdditiveBlending,
                    depthTest: false,
                    depthWrite: false,
                }
            })
            
            object.getGeometry().setDrawRange(0, currentData * 3 * 2)
            object.get().rotation.z = deg * RADIAN
            
            this.group.add(object.get())
            objects.push(object)

            
            // point
            for(let j = 0; j < 2; j++){
                const point = new Particle({
                    count: 2,
                    materialName: 'ShaderMaterial',
                    materialOpt:{
                        vertexShader: Shader.vertex,
                        fragmentShader: Shader.fragment,
                        transparent: true,
                        // blending: THREE.AdditiveBlending,
                        depthTest: false,
                        depthWrite: false,
                        uniforms: {
                            uColor: {value: new THREE.Color(this.param.color)},
                            uPointSize: {value: this.param.pointSize},
                            uOpacity: {value: 0},
                            uPointScale: {value: 0}
                        }
                    }
                })

                const {position} = this.createAttribute(object, currentData)
                point.setAttribute('position', new Float32Array(position), 3)

                point.get().rotation.z = deg * RADIAN
             
                this.group.add(point.get())
                points.push(point)
            }
        }

        this.createTween(objects, points)

        this.objects.push({arr: objects, id: this.id})
        this.points.push({arr: points, id: this.id})
        this.id = (this.id + 1) % this.step
    }
    createAttribute(object, currentData){
        const position = []

        const array = object.getGeometry().attributes.position.array
        const half = object.getGeometry().attributes.position.count / 2

        for(let i = 0; i < 2; i++){
            const idx = currentData * i * 3

            const x1 = array[idx]
            const y1 = array[idx + 1]
            const z1 = array[idx + 2]

            const x2 = array[idx + half * 3]
            const y2 = array[idx + 1 + half * 3]
            const z2 = array[idx + 2 + half * 3]

            position.push(
                (x1 + x2) / 2,
                (y1 + y2) / 2,
                (z1 + z2) / 2
            )
        }

        return {position}
    }


    // tween
    createTween(objects, points){
        const start = {opacity: 1, z: 0, pScale: 1}
        const end = {opacity: -0.5, z: 200, pScale: [1, 4, 8, 12]}

        const tw = new TWEEN.Tween(start)
        .to(end, 7000)
        .onUpdate(() => this.onUpdateTween(objects, points, start))
        .onComplete(() => this.onCompleteTween(objects, points))
        .start()
    }
    onUpdateTween(objects, points, {opacity, z, pScale}){
        objects.forEach(object => {
            object.get().position.z = z
            object.getMaterial().opacity = opacity
        })

        points.forEach(point => {
            point.get().position.z = z
            point.setUniform('uOpacity', opacity)
            point.setUniform('uPointScale', pScale)
        })
    }
    onCompleteTween(objects, points){
        this.remove('objects', objects)
        this.remove('points', points)
    }


    // remove
    remove(name, objs){
        objs.forEach(obj => {
            this.group.remove(obj.get())
            obj.dispose()
        })
        objs.length = 0
        this[name].shift()
    }


    // dispose
    dispose(){
        this.group.clear()

        this.objects.forEach(({arr}) => {
            arr.forEach(object => object.dispose())
            arr.length = 0
        })
        this.points.forEach(({arr}) => {
            arr.forEach(object => object.dispose())
            arr.length = 0
        })

        this.objects.length = 0
        this.points.length = 0
    }


    // animate
    animate({audioData, audioDataAvg}){
        this.generate()

        this.group.rotation.z += 0.01

        this.rotate('objects')
        this.rotate('points')

        if(audioData){
            this.audioIsPlaying = true
            this.currentData = ~~(audioDataAvg * this.max)
        }
    }
    rotate(name){
        this[name].forEach(({arr}) => {
            arr.forEach(object => {
                object.get().rotation.z -= 0.01
            })
        })
    }
    generate(){
        if(!this.audioIsPlaying) return

        const time = window.performance.now()

        if(time - this.oldTime > this.interval){
            this.create()
            this.oldTime = time
        }
    }


    // swap material to avoid bloom
    setMaterial(){
        for(let i = 0; i < this.objects.length; i++){
            const id = this.objects[i].id 

            if(this.currentData > this.limit && id % this.step === 0) continue

            const child = this.objects[i].arr

            child.forEach(object => {
                object.setMaterial(this.darkMaterial)
            })
        }
    }
    restoreMaterial(){
        this.objects.forEach(({arr}) => {
            arr.forEach(object => {
                object.setMaterial(object.getMaterial()) 
            })

        })
    }
}