// import * as THREE from '../../lib/three.module.js'

const Circle = class{
    constructor({radius, seg, materialName, materialOpt}){
        this.radius = radius
        this.seg = seg
        this.materialName = materialName
        this.materialOpt = materialOpt
    
        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = new THREE.Mesh(geometry, material)
    }
    createGeometry(){
        return new THREE.CircleGeometry(this.radius, this.seg)
    }
    createMaterial(){
        return new THREE[this.materialName](this.materialOpt)
    }


    // dispose
    dispose(){
        this.getGeometry().dispose()
        this.getMaterial().dispose()
    }


    // set
    setAttribute(name, array, itemSize){
        this.mesh.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }
    setUniform(name, value){
        this.mesh.material.uniforms[name].value = value
    }


    // get
    get(){
        return this.mesh
    }
    getGeometry(){
        return this.mesh.geometry
    }
    getMaterial(){
        return this.mesh.material
    }
    getAttribute(name){
        return this.mesh.geometry.attributes[name]
    }
    getUniform(name){
        return this.mesh.material.uniforms[name].value
    }
}