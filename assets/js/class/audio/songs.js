export default class{
    constructor(songs){
        this.songs = songs
        
        this.list = []
        this.maxVolume = 1
        this.fft = 2 ** 14
        this.smoothingTimeConstant = 0.65

        this.sources = []
        this.canPlay = false

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
            const length = '00:00'

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

            if(audio) audio.addEventListener('canplaythrough', () => song.length = audio.duration)
        })
    }
    playAudio(idx, time = 0.2){
        const {audio} = this.list[idx]
        if(!audio) return

        this.createTween({audio, 
            s: {volume: 0},
            e: {volume: this.maxVolume},
            cbs: {
                onStart: (audio) => {
                    audio.currentTime = audio.duration * time
                    audio.play()
                }
            },
            delay: 500
        })
    }
    stopAudio(idx, playAudioAfter){
        const {audio} = this.list[idx]
        if(!audio) return

        this.createTween({audio, 
            s: {volume: this.maxVolume},
            e: {volume: 0},
            cbs: {
                onComplete: (audio) => {
                    audio.pause()
                    if(playAudioAfter) this.playAudio(idx, 0)
                }
            },
            delay: 0
        })
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
        this.context = new AudioContext()
        this.analyser = this.context.createAnalyser()
        
        let source = null

        if(this.sources[idx]) source = this.sources[idx]
        else{
            this.sources[idx] = this.context.createMediaElementSource(this.getAudio(idx))
            source = this.sources[idx]
            source.connect(this.analyser)
        }
        
        this.analyser.connect(this.context.destination)
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