import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({materialName, materialOpt}){
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

        this.mesh = new THREE.Line(geometry, material)
    }
    createGeometry(){
        const geometry = new THREE.BufferGeometry()

        return geometry
    }
    createMaterial(){
        return new THREE[this.materialName](this.materialOpt)
    }


    // dispose
    dispose(){
        this.getGeometry().dispose()
        this.getMaterial().dispose()
    }


    // get
    get(){
        return this.mesh
    }
    getGeometry(){
        return this.mesh.geometry
    }
    getPosition(){
        return this.position
    }
    getAttribute(name){
        return this.mesh.geometry.attributes[name]
    }


    // set
    setAttribute(name, array, itemSize){
        this.mesh.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }
    setUniform(name, value){
        this.mesh.material.uniforms[name].value = value
    }
}