class LightsaberTimerView {
    constructor(parent) {
        this.parent = parent
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if(className) element.className.add(className)
        return element;
    }

    display(timeLeft, maxTime) {
        //create box 
        this.timerView = this.createElement('div','TimerView')
        //create lightsaber and path
        this.lightsaber = this.createElement('div','lightsaber')
        this.pathLightsaber = this.createElement('div', 'pathLightsaber')
        this.lightsaber.append(this.pathLightsaber)
        //create countingdown text
        this.progress = this.createElement('progress')
        this.timerView.append(this.lightsaber, this.progress)
        this.parent.append(this.timerView)
    }

    updateTimer(timeLeft, maxTime) {
        this.maxTime = maxTime
        this.timeLeft = timeLeft

        const minutes = Math.floor(timeLeft/60)
        const seconds = timeLeft - (minutes*60)

        this.progress.textContent = `Time left: ${minutes}m ${seconds}s`

        this.pathLightsaber.style.width = `(${timeLeft}*100/${maxTime})%`
    }
}