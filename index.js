const btnPlayPause = document.getElementById('play-pause')
const btnStop = document.getElementById('stop')
const display = document.getElementById('display')

class Stopwatch{
    constructor(displayElement){
        this.init()
        this.displayElement = displayElement
    }

    init(){
        this.intervalStopwatch = null
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
        this.display = '00:00:00'
    }

    addSecond(sec = 1){
        this.seconds += sec
        if(this.seconds >= 60){
            const mins = Math.floor(this.seconds/60)
            this.seconds %= 60    
            this.minutes += mins
            if(this.minutes >= 60){
                const hr = Math.floor(this.minutes/60)
                this.minutes %= 60    
                this.hours += hr
            }
        }
        this.setDisplay()
    }
    
    setDisplay(){
        let seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds
        let minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes
        let hours = this.hours < 10 ? '0' + this.hours : this.hours
        this.display = `${hours}:${minutes}:${seconds}`
        this.displayElement.textContent = this.display
    }

    start(){
        this.intervalStopwatch = setInterval(() => {
            this.addSecond()
        },1000)
    }
    
    playPause(){
        if(!this.intervalStopwatch) this.start()
        else{
            //Pause
            clearInterval(this.intervalStopwatch)
            this.intervalStopwatch = null
        }
    }

    stop(){
        clearInterval(this.intervalStopwatch)
        this.init()
        this.displayElement.textContent = this.display
    }
}

const stopwatch = new Stopwatch(display)

function playPauseIcon(){
    const playPauseIcon = document.querySelector('#play-pause>i')
    if(stopwatch.intervalStopwatch){
        playPauseIcon.classList.remove('fa-play')
        playPauseIcon.classList.add('fa-pause')
    }else{
        playPauseIcon.classList.remove('fa-pause')
        playPauseIcon.classList.add('fa-play')
    }
}

btnPlayPause.addEventListener('click', () => {
    stopwatch.playPause()
    playPauseIcon()
})

btnStop.addEventListener('click', () => {
    stopwatch.stop()
    playPauseIcon()
})