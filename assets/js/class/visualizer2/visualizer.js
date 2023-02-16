import * as THREE from '../../lib/three.module.js'
import PublicMethod from '../../method/method.js'
import {EffectComposer} from '../../postprocess/EffectComposer.js'
import {RenderPass} from '../../postprocess/RenderPass.js'
import {ShaderPass} from '../../postprocess/ShaderPass.js'
import {VolumetericLightShader} from '../../postprocess/VolumetericLightShader.js'

import Child from './build/visualizer.child.build.js'
import PARTICLE from './build/visualizer.particle.build.js'
import LOGO from './build/visualizer.logo.build.js'

const Visualizer2 = class{
    constructor({app, audio, canvas, color, logoPath, radius}){
        this.renderer = app.renderer
        this.audio = audio
        this.element = canvas
        
        const {width, height} = this.element.getBoundingClientRect()
        this.canvas = canvas
        this.canvas.width = width * RATIO
        this.canvas.height = height * RATIO

        this.context = this.canvas.getContext('2d')

        this.logoPath = logoPath
        this.color = color
        this.radius = radius

        this.renderer.setSize(width, height)

        this.param = {
            fov: 60,
            near: 0.1,
            far: 10000,
            pos: 100,
        }

        this.modules = {
            child: Child,
            particle: PARTICLE,
            logo: LOGO
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
        this.initComposer()
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

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
        
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
    initComposer(){
        const {right, left, bottom, top} = this.element.getBoundingClientRect()
        const width = right - left
        const height = bottom - top

        const renderScene = new RenderPass( this.scene, this.camera )

        const renderTarget = new THREE.WebGLRenderTarget(width, height, {format: THREE.RGBAFormat, samples: 2048})
        this.composer = new EffectComposer(this.renderer, renderTarget)

        const volumePass = new ShaderPass(VolumetericLightShader)
        volumePass.needsSwap = false

        this.composer.addPass(renderScene)
        this.composer.addPass(volumePass)

        this.composer.setSize(width, height)
    }


    // create
    create(){
        for(const module in this.modules){
            const instance = this.modules[module]
            const group = this.group[module]

            this.comp[module] = new instance({group, size: this.size, logoPath: this.logoPath, radius: this.radius})
        }

        for(let i in this.group) this.build.add(this.group[i])
        
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

        this.disposeComposer('composer')

        this.renderer.renderLists.dispose()
        this.renderer.info.programs.forEach(program => program.destroy())
        this.renderer.info.programs.length = 0
    }
    disposeComposer(name){
        while(this[name].passes.length !== 0){
            const pass = this[name].passes.pop()

            if(pass.dispose) pass.dispose()
            if(pass.fsQuad){
                pass.fsQuad.dispose()
                pass.fsQuad.material.dispose()
            }
        }

        this[name].renderTarget1.dispose()
        this[name].renderTarget2.dispose()
        
        this[name].renderTarget1 = null
        this[name].renderTarget2 = null

        this[name].copyPass.fsQuad.dispose()
        this[name].copyPass.fsQuad.material.dispose()

        this[name] = null
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

        this.composer.render()
                
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.drawImage(this.renderer.domElement, 0, 0)
    }
    animateObject(){
        const {audioData, audioDataAvg} = this.audio

        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].animate) continue
            this.comp[i].animate({renderer: this.renderer, audioData, audioDataAvg})
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

        this.composer.setSize(width, height)

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

export {Visualizer2}