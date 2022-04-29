// import * as THREE from '../../lib/three.module.js'
// import {EffectComposer} from '../../postprocess/EffectComposer.js'
// import {RenderPass} from '../../postprocess/RenderPass.js'
// import {ShaderPass} from '../../postprocess/ShaderPass.js'
// import {UnrealBloomPass} from '../../postprocess/UnrealBloomPass.js'
// import {TestShader} from '../../postprocess/TestShader.js'
// import Method from '../../method/method.js'

// import Center from './build/visualizer.center.build.js'
// import Child from './build/visualizer.child.build.js'
// import Tunnel from './build/visualizer.tunnel.build.js'
// import Line from './build/visualizer.line.build.js'
// import Logo from './build/visualizer.logo.build.js'
  
const Visualizer0 = class{
    constructor({app, audio, element, color, radius, logoSrc}){
        this.renderer = app.renderer
        this.audio = audio
        this.element = document.querySelector(element)
        this.color = color
        this.radius = radius
        this.logoSrc = logoSrc

        this.param = {
            fov: 60,
            near: 0.1,
            far: 10000,
            pos: 100,
            strength: 2,
            radius: 0,
            threshold: 0,
        }

        this.modules = {
            tunnel: Visualizer0TunnelBuild,
            line: Visualizer0LineBuild,
            center: Visualizer0CenterBuild,
            child: Visualizer0ChildBuild,
            logo: Visualizer0LogoBuild
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
                w: Method.getVisibleWidth(this.camera, 0),
                h: Method.getVisibleHeight(this.camera, 0)
            }
        }
    }
    initComposer(){
        const {right, left, bottom, top} = this.element.getBoundingClientRect()
        const width = right - left
        const height = bottom - top

        const renderScene = new THREE.RenderPass( this.scene, this.camera )

        // bloom composer
        const bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( width, height ), 
            this.param.strength,
            this.param.radius,
            this.param.threshold
        )

        this.bloomComposer = new THREE.EffectComposer(this.renderer)
        this.bloomComposer.renderToScreen = false
        this.bloomComposer.addPass(renderScene)
        this.bloomComposer.addPass(bloomPass)


        // final composer
        const finalPass = new THREE.ShaderPass(
            new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: {value: null},
                    bloomTexture: {value: this.bloomComposer.renderTarget2.texture}
                },
                vertexShader: FinalShader.vertexShader,
                fragmentShader: FinalShader.fragmentShader,
                transparent: true,
                defines: {}
            }), "baseTexture"
        )
        finalPass.needsSwap = true

        const renderTarget = new THREE.WebGLRenderTarget(width, height, {format: THREE.RGBAFormat, samples: 2048})
        this.finalComposer = new THREE.EffectComposer(this.renderer, renderTarget)
        this.finalComposer.addPass(renderScene)
        this.finalComposer.addPass(finalPass)
    }


    // create
    create(){
        for(const module in this.modules){
            const instance = this.modules[module]
            const group = this.group[module]

            this.comp[module] = new instance({group, size: this.size, radius: this.radius, color: this.color, logoSrc: this.logoSrc})
        }

        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }


    // dispose
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

        this.disposeComposer('bloomComposer')
        this.disposeComposer('finalComposer')

        this.renderer.renderLists.dispose()
        this.renderer.info.programs.forEach(program => program.destroy())
        this.renderer.info.programs.length = 0
    }
    disposeComposer(name){
        while(this[name].passes.length !== 0){
            const pass = this[name].passes.pop()

            if(pass.dispose) {
                pass.dispose()
            }
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
        this.animateGroup()

        this.animation = requestAnimationFrame(() => this.animate())
    }
    render(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = this.renderer.domElement.clientHeight - rect.bottom

        this.renderer.setScissor(left, bottom, width, height)
        this.renderer.setViewport(left, bottom, width, height)

        this.setMaterial()
        this.bloomComposer.render()
        this.restoreMaterial()
        this.finalComposer.render()
    }
    animateGroup(){
        const time = window.performance.now()

        const x = SIMPLEX.noise3D(0.005, 0.02, time * 0.0002581)
        const y = SIMPLEX.noise3D(0.015, 0.01, time * 0.0002123)

        this.build.position.x = x * 9
        this.build.position.y = y * 9
    }
    animateObject(){
        const {audioData, audioDataAvg} = this.audio

        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].animate) continue
            this.comp[i].animate({renderer: this.renderer, audioData, audioDataAvg})
        }
    }
    setMaterial(){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].setMaterial) continue
            this.comp[i].setMaterial()
        } 
    }
    restoreMaterial(){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].restoreMaterial) continue
            this.comp[i].restoreMaterial()
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

        this.bloomComposer.setSize(width, height)
        this.finalComposer.setSize(width, height)

        this.size.el.w = width
        this.size.el.h = height
        this.size.obj.w = Method.getVisibleWidth(this.camera, 0)
        this.size.obj.h = Method.getVisibleHeight(this.camera, 0)
    }
    resizeObject(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].resize) continue
            this.comp[comp].resize(this.size)
        }
    }
}