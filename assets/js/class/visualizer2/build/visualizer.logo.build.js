import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'

export default class{
    constructor({group, logoSrc}){
        if(!logoSrc) return

        this.group = group
        this.src = logoSrc

        this.param = {
            width: 30,
            height: 30,
        }

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const loader = new THREE.TextureLoader()
        
        loader.load(this.src, (texture) => {

            this.object = new Plane({
                width: this.param.width,
                height: this.param.height,
                widthSeg: 1,
                heightSeg: 1,
                materialName: 'MeshBasicMaterial',
                materialOpt: {
                    map: texture,
                    transparent: true
                }
            })

            this.group.add(this.object.get())

        })
    }


    // dispose
    dispose(){
        this.group.clear()
        this.object.dispose()
    }
}