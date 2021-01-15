class LightsaberTimerView {
    constructor(parent) {
        this.parent = parent;
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    display() {
        //create box 
        this.timerView = this.createElement('div','timerView');
        //create box for lighsber and countingdown
        this.lightsaberView = this.createElement('div','lightsaberView');
        //create box for img 
        this.imgLightsaberView = this.createElement('div','imgLightsaberView');
        //create lightsaber path
        this.lightsaber = this.createElement('div','lightsaber');
        this.pathLightsaber = this.createElement('div', 'pathLightsaber')

        this.lightsaber.append(this.pathLightsaber)
        this.lightsaberView.append(this.imgLightsaberView, this.lightsaber)
        //create countingdown div
        this.countingDown = this.createElement('div', 'countingDown')
        this.countingDown.textContent = "Time left: ";
        this.spanCountingDown = this.createElement('span');
        this.countingDown.append(this.spanCountingDown);

        this.timerView.append(this.lightsaberView, this.countingDown);
        this.parent.append(this.timerView);
    }

    updateTime(timeLeft, maxTime) {
        this.maxTime = maxTime;
        this.timeLeft = timeLeft;

        const minutes = Math.floor(timeLeft/60);
        const seconds = timeLeft - (minutes*60);
        const newWidth = timeLeft*100/maxTime;

        this.spanCountingDown.textContent = `${minutes}m ${seconds}s`;
        this.pathLightsaber.style.width = `${newWidth}%`;
    }
}

export default LightsaberTimerView;