import Method from "../../method/method.js"

export default class{
    constructor({audios, playlist}){
        this.audios = audios
        this.playlist = playlist
        
        this.playFlag = Array.from(this.audios, _ => false)
        this.stopFlag = Array.from(this.audios, _ => false)
        this.volumeVelocity = 0.03
        this.stopTime = false

        this.list = []
        this.volume = 1
        this.fft = 2 ** 14
        this.smoothingTimeConstant = 0.65

        this.context = null
        this.sources = []
        this.analysers = []
        this.canPlay = false
        this.analyser = null
        this.audioData = []
        this.audioDataAvg = 0

        this.currentAnalyser = null
        this.currentSource = null

        this.init()
    }


    // init
    init(){
        this.create()

        this.animate()
    }


    // create
    create(){
        this.createPlaylist()
        this.createContext()
    }
    createPlaylist(){
        this.list = Array.from(this.audios, (audio, idx) => {
            const {duration} = audio
            
            audio.volume = 0
            audio.loop = true

            return {duration, audio}
        })
    }
    createContext(){
        this.context = new AudioContext()

        this.audios.forEach(audio => {

            const source = this.context.createMediaElementSource(audio)
            const analyser = this.context.createAnalyser()

            analyser.connect(this.context.destination)
            source.connect(analyser)
    
            analyser.fftSize = this.fft
            analyser.smoothingTimeConstant = this.smoothingTimeConstant
            
            this.analysers.push(analyser)
            this.sources.push(source)
        })
    }


    // audio event
    resumeAudio(idx){
        const {audio} = this.list[idx]
        if(!audio) return

        this.playFlag[idx] = true
        this.stopFlag[idx] = false

        audio.play()
        // this.context.resume()
    }
    pauseAudio(idx){
        const {audio} = this.list[idx]
        if(!audio) return

        this.stopTime = false
        this.playFlag[idx] = false
        this.stopFlag[idx] = true
    }
    prePlayAudio(idx, time = 0.2){
        const {audio} = this.list[idx]
        if(!audio) return

        this.playFlag[idx] = true
        this.stopFlag[idx] = false

        audio.currentTime = audio.duration * time
        audio.play()
        // this.context.resume()
    }
    preStopAudio(idx){
        const {audio} = this.list[idx]
        if(!audio) return

        this.stopTime = true
        this.playFlag[idx] = false
        this.stopFlag[idx] = true
    }


    // get
    getAudio(idx){
        return this.list[idx].audio
    }
    getSong(idx){
        return this.list[idx]
    }
    getList(){
        return this.list
    }
    // get
    getProgress(idx){
        const {audio} = this.list[idx]
        return audio.currentTime / audio.duration
    }
    getCurrentTime(idx){
        const {audio} = this.list[idx]
        return audio.currentTime
    }


    // set
    setVolume(volume, idx){
        const {audio} = this.list[idx]
        audio.volume = volume
        this.volume = volume
    }
    setCurrentTime(idx, timeRatio = 0){
        const {audio} = this.list[idx]

        // 0 <= timeRatio <= 1
        audio.currentTime = timeRatio * audio.duration
    }


    // tween
    resetAudio(idx, isToPlaying, delay = 1000){
        const {audio} = this.list[idx]
        const analyser = this.analysers[idx]


        const start = {volume: 1}
        const end = {volume: 0}

        const tw = new TWEEN.Tween(start)
        .to(end, delay)
        .onUpdate(() => audio.volume = start.volume)
        .onComplete(() => {
            audio.currentTime = 0
            audio.volume = 1

            if(isToPlaying){
                const bufferLength = analyser.frequencyBinCount
                this.audioData = new Uint8Array(bufferLength)
                this.analyser = analyser
            }else{
                this.analyser = null
            }
     
        })
        .start()
    }


    // animate
    animate(){
        this.playAudioFadeIn()
        this.stopAudioFadeOut()

        if(this.analyser) this.updateAudioData()

        requestAnimationFrame(() => this.animate())
    }
    updateAudioData(){
        this.analyser.getByteFrequencyData(this.audioData)

        const len = ~~(this.audioData.length / 4)
        const half = [...this.audioData].slice(0, len)
        this.audioDataAvg = half[~~(half.length * 0.2)] / 255
    }
    playAudioFadeIn(){
        this.playFlag.forEach((flag, idx) => {
            
            if(flag){
                const {audio} = this.list[idx]
    
                const volume = audio.volume + this.volumeVelocity
                audio.volume = Method.clamp(volume, 0, 1)
    
                if(audio.volume >= this.volume){
                    this.playFlag[idx] = false
                }
            }

        })
   
    }
    stopAudioFadeOut(){
        this.stopFlag.forEach((flag, idx) => {
            
            if(flag){
                const {audio} = this.list[idx]
    
                const volume = audio.volume - this.volumeVelocity
                audio.volume = Method.clamp(volume, 0, 1)
    
                if(audio.volume <= 0){
                    this.stopFlag[idx] = false
                    if(this.stopTime) audio.currentTime = 0
                    audio.pause()
                }
            }

        })
    }
}