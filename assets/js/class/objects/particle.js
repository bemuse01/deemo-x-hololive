import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({count, lifeVelocity, materialName, materialOpt}){
        this.count = count
        this.materialName = materialName
        this.materialOpt = materialOpt

        if(lifeVelocity){
            this.lifeVelocity = Array.from({length: count}, () => Math.random() * (lifeVelocity.max - lifeVelocity.min) + (lifeVelocity.min))
        }

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.createGeometry()
        this.createMaterial()
        this.mesh = new THREE.Points(this.geometry, this.material)
    }
    createGeometry(){
        this.geometry = new THREE.BufferGeometry()
    }
    createMaterial(){
        this.material = new THREE[this.materialName](this.materialOpt)
    }


    // dispose
    dispose(){
        this.mesh.geometry.dispose()
        this.mesh.material.dispose()
    }


    // set
    setAttribute(name, array, itemSize){
        this.mesh.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }
    setUniform(name, value){
        this.material.uniforms[name].value = value
    }


    // get
    get(){
        return this.mesh
    }
    getAttribute(name){
        return this.mesh.geometry.attributes[name]
    }
    getMaterial(){
        return this.material
    }
}