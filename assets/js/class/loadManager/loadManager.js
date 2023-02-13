export default class{
    constructor(data){
        this.data = data

        this.isLoading = true
        // this.init()
    }


    // init
    init(){
    }


    // load
    async load(){
        await Promise.all(this.data.slice(1).map(({logoPath, bgPath, audioPath}) => this.loadAll(logoPath, bgPath, audioPath)))
        this.isLoading = false
    }
    loadImg(src){
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                resolve(img)
            }
        })
    }
    loadSong(src){
        return new Promise((resolve, reject) => {
            const audio = new Audio()

            audio.addEventListener('loadedmetadata', () => {
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