import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({element}){
        this.element = element

        const {width, height} = this.element.getBoundingClientRect()
        this.width = width
        this.height = height
        
        this.init()
    }


    // init
    init(){
        this.create()

        // this.animate()
        window.addEventListener('resize', () => this.resize())
    }


    // create
    create(){
        this.scene = new THREE.Scene()
    
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(RATIO)
        this.renderer.setClearColor(0x000000, 0.0)
        this.renderer.setClearAlpha(0.0)
        this.renderer.autoClear = false
        this.renderer.toneMappingExposure = 1
    }


    // render
    animate(){
        this.render()

        requestAnimationFrame(() => this.animate())
    }
    render(){
        this.renderer.setScissorTest(false)
        this.renderer.clear(true, true)
        this.renderer.setScissorTest(true)
    }


    // resize
    resize(){
        const {width, height} = this.element.getBoundingClientRect()

        this.width = width
        this.height = height

        this.renderer.setSize(this.width, this.height)
    }
}