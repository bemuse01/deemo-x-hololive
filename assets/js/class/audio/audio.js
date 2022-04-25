export default class{
    constructor(){
        this.param = {
            fft: 2 ** 14,
            smoothingTimeConstant: 0.65,
        }

        this.audio = null

        this.init()
    }


    // init 
    init(){
        this.animate()
    }


    // create
    create(audio){
        this.audio = audio

        this.createContext()
    }
    createContext(){
        this.context = new AudioContext()
        
        const source = this.context.createMediaElementSource(this.audio)
        
        this.analyser = this.context.createAnalyser()
        source.connect(this.analyser)
        this.analyser.connect(this.context.destination)
        this.analyser.fftSize = this.param.fft
        this.analyser.smoothingTimeConstant = this.param.smoothingTimeConstant
        
        const bufferLength = this.analyser.frequencyBinCount
        
        this.audioData = new Uint8Array(bufferLength)
    }


    // play
    play(){
        this.audio.play()
    }


    // close
    close(){
        this.context.close()
    }


    // animate
    animate(){
        if(!this.analyser) return

        this.analyser.getByteFrequencyData(this.audioData)

        // const len = ~~(this.audioData.length / 4)
        const half = [...this.audioData].slice(0, this.audioData.length)
        this.audioDataAvg = half[~~(half.length * 0.1)] / 255

        requestAnimationFrame(() => this.animate())
    }


    // play
    play(){
        this.audio.play()
        this.context.resume()
    }
}