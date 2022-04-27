import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({geometry, materialName, materialOpt}){
        this.geometry = geometry
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
        this.mesh = new THREE.LineSegments(geometry, material)
    }
    createGeometry(){
        return new THREE.EdgesGeometry(this.geometry)
    }
    createMaterial(){
        return new THREE[this.materialName](this.materialOpt)
    }


    // dispose
    dispose(){
        this.mesh.geometry.dispose()
        this.mesh.material.dispose()
        this.mesh.geometry = null
        this.mesh.material = null
        this.mesh = null
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