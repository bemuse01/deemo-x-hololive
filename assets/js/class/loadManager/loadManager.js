export default class{
    constructor(data){
        this.data = data

        this.init()
    }


    // init
    async init(){
        this.load()
    }


    // load
    async load(){
        const data = await Promise.all(this.data.map(({logoPath, bgPath, audioPath}) => this.loadAll(logoPath, bgPath, audioPath)))
        console.log(data)
    }
    loadImg(src){
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                console.log('img loaded')
                resolve(img)
            }
        })
    }
    loadSong(src){
        return new Promise((resolve, reject) => {
            const audio = new Audio()

            audio.addEventListener('loadedmetadata', () => {
                console.log('work')
                resolve(audio)
            })

            audio.addEventListener('error', (e) => {
                reject(e)
            })

            audio.src = src
        })
    }
    loadAll(logoPath, bgPath, audioPath){
        return new Promise(async (resolve, reject) => {
            const logo = await this.loadImg(logoPath)
            const bg = await this.loadImg(bgPath)
            const song = await this.loadSong(audioPath)

            resolve({logo, bg, song})
        })
    }
}