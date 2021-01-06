class LightsaberTimerView {
    constructor(parent) {
        this.parent = parent;
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    display(timeLeft, maxTime) {
        //create box 
        this.timerView = this.createElement('div','TimerView');
        //create lightsaber 
        this.lightsaber = this.createElement('div','lightsaber');
        //create progress and label
        this.progress = this.createElement('progress');
        this.setProgressAtributes(this.progress, timeLeft, maxTime);
        this.progress.id = "lightsaberTimer";
        this.label = this.createElement('label');
        this.label.setAttribute('for', `lightsaberTimer`);
        this.label.textContent = "Time left: ";
        this.spanLabel = this.createElement('span');
        this.label.append(this.spanLabel);

        this.timerView.append(this.lightsaber, this.progress, this. label);
        this.parent.append(this.timerView);
        this.updateTime(timeLeft, maxTime);
    }

    updateTime(timeLeft, maxTime) {
        this.maxTime = maxTime;
        this.timeLeft = timeLeft;

        const minutes = Math.floor(timeLeft/60);
        const seconds = timeLeft - (minutes*60);

        this.spanLabel.textContent = `${minutes}m ${seconds}s`;
        this.setProgressAtributes(this.progress, timeLeft, maxTime);
    }

    setProgressAtributes(element, value, max) {
        element.setAttribute('value', value);
        element.setAttribute('max', max);
    }
}

export default LightsaberTimerView;