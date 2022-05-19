import * as THREE from '../../lib/three.module.js'

import Param from './param/logo.param.js'
import PublicMethod from '../../method/method.js'

import Child from './build/logo.child.build.js'

export default class{
    constructor({app, anim, src, element, canvas}){
        this.anim = anim
        this.src = src
        this.renderer = app.renderer
        this.element = element

        const {width, height} = this.element.getBoundingClientRect()
        this.canvas = canvas
        this.canvas.width = width * RATIO
        this.canvas.height = height * RATIO

        this.context = this.canvas.getContext('2d')

        this.renderer.setSize(width, height)

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
                
        this.resizeEvent = () => {
            this.resize()
        }

        window.addEventListener('resize', this.resizeEvent)
    }
    initGroup(){
        for(const module in this.modules){
            this.group[module] = new THREE.Group()
            this.comp[module] = null
        }
    }
    initRenderObject(){
        const {width, height} = this.element.getBoundingClientRect()
        const w = width * RATIO
        const h = height * RATIO

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(Param.fov, w / h, Param.near, Param.far)
        this.camera.position.z = Param.pos
        
        this.size = {
            el: {
                w: w,
                h: h
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

            this.comp[module] = new instance({group, size: this.size, name: module, anim: this.anim, src: this.src})
        }

        for(const group in this.group) this.build.add(this.group[group])
        
        this.scene.add(this.build)
    }


    // remove
    dispose(){
        cancelAnimationFrame(this.animation)
        window.removeEventListener('resize', this.resizeEvent)

        this.build.clear()
        this.scene.clear()

        this.build = null
        this.scene = null

        for(const comp in this.comp){
            this.comp[comp].dispose()
        }

        this.comp = null
        this.group = null

        this.renderer.renderLists.dispose()
        this.renderer.info.programs.forEach(program => program.destroy())
        this.renderer.info.programs.length = 0
    }


    // animate
    animate(){
        this.render()
        this.animateObject()

        this.animation = requestAnimationFrame(() => this.animate())
    }
    render(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = this.renderer.domElement.clientHeight - rect.bottom

        // this.renderer.setScissor(left, bottom, width, height)
        // this.renderer.setViewport(left, bottom, width, height)

        this.renderer.clear()

        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera)
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.drawImage(this.renderer.domElement, 0, 0)
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
    
        this.canvas.width = width * RATIO
        this.canvas.height = height * RATIO
    }
    resizeObject(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].resize) continue
            this.comp[comp].resize(this.size)
        }
    }
}