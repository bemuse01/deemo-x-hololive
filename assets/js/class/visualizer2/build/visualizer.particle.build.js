import * as THREE from '../../../lib/three.module.js'
import Edge from '../../objects/edge.js'
import Plane from '../../objects/plane.js'

export default class{
    constructor({group, radius}){
        this.group = group
        
        this.param = {
            size: 4,
            count: 50,
            color: 0xffffff,
            linewidth: 2,
            radius: radius + 1,
            lineOpacity: 1,
            planeOpacity: 0.8
        }

        this.play = true
        this.objects = []
        this.tws = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        for(let i = 0; i < this.param.count; i++){
            const group = new THREE.Group()

            const rot = {x: Math.random() * 360, y: Math.random() * 360, z: Math.random() * 360}

            const plane = this.createPlane(rot)
            const line = this.createLine(plane.getGeometry(), rot)

            group.add(line.get())
            group.add(plane.get())

            group.degree = Math.random() * 360
            group.rx = THREE.Math.randFloat(0.0025, 0.005)
            group.ry = THREE.Math.randFloat(0.0025, 0.005)
            group.rz = THREE.Math.randFloat(0.0025, 0.005)

            this.setPosition(group, this.param.radius, 1)

            this.createTween(group, i)

            this.objects.push(plane, line)

            this.group.add(group)
        }
    }
    createPlane(rot){
        const object = new Plane({
            width: this.param.size,
            height: this.param.size,
            widthSeg: 1,
            heightSeg: 1,
            materialName: 'MeshBasicMaterial',
            materialOpt: {
                color: this.param.color,
                transparent: true,
                opacity: 0,
                depthWrite: false,
                depthTest: false,
                side: THREE.DoubleSide
            }
        })

        object.get().rotation.x = rot.x
        object.get().rotation.y = rot.y
        object.get().rotation.z = rot.z

        return object
    }
    createLine(geometry, rot){
        const object = new Edge({
            geometry,
            materialName: 'LineBasicMaterial',
            materialOpt: {
                color: this.param.color,
                transparent: true,
                opacity: 0,
                depthWrite: false,
                depthTest: false,
            }
        })

        object.get().rotation.x = rot.x
        object.get().rotation.y = rot.y
        object.get().rotation.z = rot.z

        return object
    }
    setPosition(group, radius, pos){
        const degree = group.degree

        const x = Math.cos(degree * RADIAN) * radius
        const y = Math.sin(degree * RADIAN) * radius

        group.position.x = x * pos
        group.position.y = y * pos
    }


    // tween
    createTween(group, idx){
        const line = group.children[0]
        const plane = group.children[1]

        const start = {opacity: 0, pos: 1}
        const end = {opacity: [0.5, 1, 0.5, 0], pos: 2}

        this.tws.push(
            new TWEEN.Tween(start)
            .to(end, 5000)
            .onUpdate(() => this.onUpdateTween(line, plane, group, start))
            .onRepeat(() => this.onRepeatTween(group))
            .delay(200 * idx)
            .repeat(Infinity)
            .start()
        )
    }
    onUpdateTween(line, plane, group, {opacity, pos}){
        line.material.opacity = this.param.lineOpacity * opacity
        plane.material.opacity = this.param.planeOpacity * opacity
        
        this.setPosition(group, this.param.radius, pos)
    }
    onRepeatTween(group){
        group.degree = Math.random() * 360
    }


    // dispose
    dispose(){
        this.group.children.forEach(group => group.clear())
        this.group.clear()
        
        this.objects.forEach(object => object.dispose())
        this.objects.length = 0

        this.tws.forEach(tw => {
            tw.stop()
            TWEEN.remove(tw)
        })
        this.tws.length = 0

        this.play = false
    }


    // animate
    animate(){
        if(!this.play) return

        this.group.children.forEach(group => {
            group.children.forEach(mesh => {
                mesh.rotation.x += group.rx
                mesh.rotation.y += group.ry
                mesh.rotation.z += group.rz
            })
        })
    }
}