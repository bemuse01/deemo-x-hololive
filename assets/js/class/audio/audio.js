export default class{
    constructor(){
        this.param = {
            fft: 2 ** 14,
            smoothingTimeConstant: 0.65,
        }

        this.audio = null
        this.sources = []
        this.canPlay = false

        this.init()
    }


    // init 
    init(){
        this.animate()
    }


    // create
    create(audio, key){
        this.audio = audio

        this.createContext(key)
    }
    createContext(key){
        this.context = new AudioContext()
        this.analyser = this.context.createAnalyser()
        
        let source = null

        if(this.sources[key]) source = this.sources[key]
        else{
            this.sources[key] = this.context.createMediaElementSource(this.audio)
            source = this.sources[key]
            source.connect(this.analyser)
        }
        
        this.analyser.connect(this.context.destination)
        this.analyser.fftSize = this.param.fft
        this.analyser.smoothingTimeConstant = this.param.smoothingTimeConstant
        
        const bufferLength = this.analyser.frequencyBinCount
        
        this.audioData = new Uint8Array(bufferLength)
    }


    // play
    play(time = 0){
        this.audio.volume = 1
        this.audio.currentTime = time
        this.audio.play()
        this.canPlay = true
    }


    // pause
    pause(){
        if(!this.context) return
    }


    // stop
    stop(){
        createTween()
    }
    createTween(){
        const start = {volume: 1}
        const end = {volume: 0}

        const tw = new TWEEN.Tween(start)
        .to(end, 600)
        .onUpdate(() => this.onUpdateTween(start))
        .start()
    }
    onUpdateTween({volume}){
        this.audio.volume = volume
    }


    // animate
    animate(){
        if(this.analyser){
            this.analyser.getByteFrequencyData(this.audioData)

            // const len = ~~(this.audioData.length / 4)
            const half = [...this.audioData].slice(0, this.audioData.length)
            this.audioDataAvg = half[~~(half.length * 0.1)] / 255
        }

        requestAnimationFrame(() => this.animate())
    }
}