import * as THREE from '../../lib/three.module.js'

export default class{
    constructor({innerRadius, outerRadius, seg, materialOpt}){
        this.innerRadius = innerRadius
        this.outerRadius = outerRadius
        this.seg = seg
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
        this.createMaterial()
        this.mesh = new THREE.Mesh(geometry, this.material)
    }
    createGeometry(){
        return new THREE.RingGeometry(this.innerRadius, this.outerRadius, this.seg)
    }
    createMaterial(){
        if(this.materialOpt.vertexShader){
            this.material = new THREE.ShaderMaterial(this.materialOpt)
        }else{
            this.material = new THREE.MeshBasicMaterial(this.materialOpt)
        }
    }

    
    // dispose
    dispose(){
        this.mesh.geometry.dispose()
        this.mesh.material.dispose()
        this.material.dispose()

        this.mesh.geometry = null
        this.mesh.material = null
        this.material = null
    }


    // set
    setAttribute(name, array, itemSize){
        this.mesh.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }
    setUniform(name, value){
        this.mesh.material.uniforms[name].value = value
    }
    setMaterial(material){
        this.mesh.material = material
    }


    // get
    get(){
        return this.mesh
    }
    getGeometry(){
        return this.mesh.geometry
    }
    getMaterial(){
        return this.material
    }
    getAttribute(name){
        return this.mesh.geometry.attributes[name]
    }
    getUniform(name){
        return this.mesh.material.uniforms[name].value
    }
}