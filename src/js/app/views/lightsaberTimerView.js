class LightsaberTimerView {
    constructor(parent) {
        this.parent = this.getElement(parent)
        //create box 
        this.timerView = this.createElement('div','TimerView')
        //create lightsaber and path
        this.lightsaber = this.createElement('div','lightsaber')
        this.pathLightsaber = this.createElement('div', 'pathLightsaber')
        this.lightsaber.append(this.pathLightsaber)
        //create countingdown text
        this.countingDown = this.createElement('h4', 'countingDown')
        this.timerView.append(this.lightsaber, this.countingDown)
        this.parent.append(this.timerView)
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if(className) element.className.add(className)
        return element;
    }
    
    getElement(selector) {
        const element = document.querySelector(selector)
        return element
    }
    
    display(timeLeft, maxTime) {
        this.maxTime = maxTime
        this.timeLeft = timeLeft

        const minutes = Math.floor(timeLeft/60)
        const seconds = timeLeft - (minutes*60)

        this.countingDown.textContent = `Time left: ${minutes}m ${seconds}s`

        this.pathLightsaber.style.width = `(${timeLeft}*100/${maxTime})px`
    }
}