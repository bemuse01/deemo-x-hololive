import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({width, height, widthSeg, heightSeg, materialName, materialOpt}){
        this.width = width
        this.height = height
        this.widthSeg = widthSeg
        this.heightSeg = heightSeg
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
        return new THREE.PlaneGeometry(this.width, this.height, this.widthSeg, this.heightSeg)
    }
    createMaterial(){
        return new THREE[this.materialName](this.materialOpt)
    }


    // dispose
    dispose(){
        this.getGeometry().dispose()
        this.getMaterial().dispose()

        const uniforms = this.getUniforms()

        if(uniforms){
            for(const name in uniforms){
                if(uniforms[name].value.dispose) uniforms[name].value.dispose()
            }
        }
    }


    // set
    setAttribute(name, array, itemSize){
        this.mesh.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }
    setUniform(name, value, idx){
        if(idx === undefined){
            this.mesh.material.uniforms[name].value = value
        }else{
            this.mesh.material.uniforms[name].value[idx] = value
        }
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
    getUniforms(){
        return this.mesh.material.uniforms
    }
    getUniform(name){
        return this.mesh.material.uniforms[name].value
    }
}