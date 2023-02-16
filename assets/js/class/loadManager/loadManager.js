export default class{
    static loadImg(path){
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = path
            img.onload = () => {
                resolve(img)
            }
        })
    }
    static loadImgs(arr){
        return Promise.all(arr) 
    }
    static loadAudio(path){
        return new Promise((resolve, reject) => {
            const audio = new Audio()

            audio.addEventListener('loadedmetadata', () => {
                resolve(audio)
            })

            audio.addEventListener('error', (e) => {
                reject(e)
            })

            audio.src = path
        })
    }
    static loadAudios(arr){
        return Promise.all(arr)
    }
}