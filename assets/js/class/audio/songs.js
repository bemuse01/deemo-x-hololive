import Method from "../../method/method.js"

export default class{
    constructor(songs){
        this.songs = songs
        
        this.playFlag = Array.from(songs, _ => false)
        this.stopFlag = Array.from(songs, _ => false)
        this.volumeVelocity = 0.03
        this.stopTime = false

        this.list = []
        this.volume = 1
        this.fft = 2 ** 14
        this.smoothingTimeConstant = 0.65

        this.context = null
        this.source = null
        this.analyser = null
        this.sources = []
        this.analysers = []
        this.canPlay = false
        this.anim = false

        this.init()
    }


    // init
    init(){
        this.create()
        this.onLoadAudio()

        this.animate()
    }


    // create
    create(){
        this.list = Array.from(this.songs, (song, idx) => {
            const {isDefault, songSrc} = song
            
            const audio = isDefault ? undefined : new Audio()
            const length = isDefault ? '\xa0' : '00:00'
            // const type = `${~~(Math.random() * 3)}`

            if(audio){
                audio.loop = true
                audio.src = songSrc
                audio.volume = 0
            }

            return {...song, length, audio}
        })
    }


    // audio
    onLoadAudio(){
        this.list.forEach(song => {
            const {audio} = song

            if(audio) audio.addEventListener('canplaythrough', () => {
                song.length = audio.duration
            })
        })
    }
    resumeAudio(idx){
        const {audio} = this.list[idx]
        if(!audio) return

        this.playFlag[idx] = true
        this.stopFlag[idx] = false

        audio.play()
        this.context.resume()
    }
    pauseAudio(idx){
        const {audio} = this.list[idx]
        if(!audio) return

        this.stopTime = false
        this.playFlag[idx] = false
        this.stopFlag[idx] = true
    }
    playAudio(idx, time = 0.2){
        const {audio} = this.list[idx]
        if(!audio) return

        this.playFlag[idx] = true
        this.stopFlag[idx] = false

        audio.currentTime = audio.duration * time
        audio.play()
        this.context.resume()
    }
    stopAudio(idx){
        const {audio} = this.list[idx]
        if(!audio) return

        this.stopTime = true
        this.playFlag[idx] = false
        this.stopFlag[idx] = true
    }
    createTween({audio, s, e, cbs, delay}){
        const start = s
        const end = e 

        const tw = new TWEEN.Tween(start)
        .to(end, 600)
        .delay(delay)
        .onUpdate(() => this.onUpdateTween(audio, start))
        .start()

        for(const cb in cbs) tw[cb](() => cbs[cb](audio))
    }

    onUpdateTween(audio, {volume}){
        audio.volume = volume
    }


    // web audio api
    createContext(idx){
        const {audio} = this.list[idx]
        if(!audio) return
        
        // if(this.source) this.source.disconnect()
        // if(this.analyser) this.analyser.disconnect()
        if(!this.context) this.context = new AudioContext()
        
        if(this.sources[idx]) this.source = this.sources[idx]
        else{
            this.sources[idx] = this.context.createMediaElementSource(this.getAudio(idx))
            this.source = this.sources[idx]
        }

        if(this.analysers[idx]) this.analyser = this.analysers[idx]
        else{
            this.analysers[idx] = this.context.createAnalyser()
            this.analyser = this.analysers[idx]
            this.analyser.connect(this.context.destination)
            this.source.connect(this.analyser)
        }

        this.analyser.fftSize = this.fft
        this.analyser.smoothingTimeConstant = this.smoothingTimeConstant
        
        const bufferLength = this.analyser.frequencyBinCount
        
        this.audioData = new Uint8Array(bufferLength)
    }


    // get
    getAudio(idx){
        return this.list[idx].audio
    }
    getSong(idx){
        return this.list[idx]
    }


    // set
    setVolume(volume, idx){
        const {audio} = this.list[idx]
        audio.volume = volume
        this.volume = volume
    }
    setAnimate(anim){
        this.anim = anim
    }


    // animate
    animate(){
        this.playAudioFadeIn()
        this.stopAudioFadeOut()

        if(this.analyser && this.anim){
            this.analyser.getByteFrequencyData(this.audioData)

            const len = ~~(this.audioData.length / 4)
            // const half = [...this.audioData].slice(0, this.audioData.length)
            // this.audioDataAvg = half[~~(half.length * 0.1)] / 255
            const half = [...this.audioData].slice(0, len)
            this.audioDataAvg = half[~~(half.length * 0.2)] / 255
        }

        requestAnimationFrame(() => this.animate())
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