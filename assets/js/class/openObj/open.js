import * as THREE from '../../lib/three.module.js'

import Param from './param/open.param.js'
import PublicMethod from '../../method/method.js'

import Child from './build/open.child.build.js'

export default class{
    constructor(app){
        this.renderer = app.renderer
        this.element = document.querySelector('.open-object')

        this.modules = {
            child: Child
        }
        this.group = {}
        this.comp = {}
        this.build = new THREE.Group()
        
        this.init()
    }


    // init
    init(){
        this.initGroup()
        this.initRenderObject()
        this.create()

        this.animate()
        window.addEventListener('resize', () => this.resize())
    }
    initGroup(){
        for(const module in this.modules){
            this.group[module] = new THREE.Group()
            this.comp[module] = null
        }
    }
    initRenderObject(){
        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(Param.fov, width / height, Param.near, Param.far)
        this.camera.position.z = Param.pos
        
        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: PublicMethod.getVisibleWidth(this.camera, 0),
                h: PublicMethod.getVisibleHeight(this.camera, 0)
            }
        }
    }


    // create
    create(){
        for(const module in this.modules){
            const instance = this.modules[module]
            const group = this.group[module]

            this.comp[module] = new instance({group, size: this.size})
        }

        for(const group in this.group) this.build.add(this.group[group])
        
        this.scene.add(this.build)
    }


    // animate
    animate(){
        this.render()
        this.animateObject()

        requestAnimationFrame(() => this.animate())
    }
    render(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = this.renderer.domElement.clientHeight - rect.bottom

        this.renderer.setScissor(left, bottom, width, height)
        this.renderer.setViewport(left, bottom, width, height)

        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera)
    }
    animateObject(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].animate) continue
            this.comp[comp].animate()
        }
    }


    // resize
    resize(){
        this.resizeRenderObject()
        this.resizeObject()
    }
    resizeRenderObject(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.size.el.w = width
        this.size.el.h = height
        this.size.obj.w = PublicMethod.getVisibleWidth(this.camera, 0)
        this.size.obj.h = PublicMethod.getVisibleHeight(this.camera, 0)
    }
    resizeObject(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].resize) continue
            this.comp[comp].resize(this.size)
        }
    }
}