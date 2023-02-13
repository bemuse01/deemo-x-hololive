import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'

export default class{
    constructor({group, logoPath, radius}){
        if(!logoPath) return

        this.group = group
        this.src = logoPath

        this.param = {
            width: radius - 5,
            height: radius - 5,
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
        if(!this.src) return
        
        this.group.clear()
        this.object.dispose()
    }
}