export default class GameOverView {
    constructor(parent, submitNameHandler,correctAnswers, totalAnswers) {
        this.parent = parent;
        this.submitNameHandler = submitNameHandler;
        this.correctAnswers = correctAnswers;
        this.totalAnswers = totalAnswers;

    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    display() {
        const formContainer = this.createElement('div', 'form__container');
        const nameForm = this.createElement('div', 'name__form');
        const insertName = this.createElement('input', 'insert__name');
        insertName.type = 'text';
        insertName.setAttribute('maxlength', '20');
        insertName.setAttribute('pattern', '[a-zA-Z0-9 ]{3,20}');
        const submitButton = this.createElement('button', 'submit__button');
        submitButton.innerText = 'MAY THE FORCE BE WITH YOU!';
        submitButton.addEventListener('click', () => {
            let providedName = insertName.value;
            this.submitNameHandler(providedName);
        });

        const headerContainer = this.createElement('div', 'header__container');
        const gameOverHeader = this.createElement('h2', 'gameover__header');
        gameOverHeader.innerText = "GAME OVER";
        const gameOverSubheader = this.createElement('h5', 'subheader');
        gameOverSubheader.innerText = `The force is strong in you young Padawan! During 1 minute you have answered ${this.correctAnswers} / ${this.totalAnswers} questions.`
        const yodaImage = this.createElement('img', 'yoda__image');
        yodaImage.src = `./static/assets/ui/MasterYodaRight.png`;
        const formHolder = this.createElement('div', 'form__holder');
        const provideNameText = this.createElement('h5', 'provideName__text');
        provideNameText.innerText = "Please fill your name in order to receive eternal glory in whole Galaxy!"

        this.parent.appendChild(formContainer);
        formContainer.appendChild(headerContainer);
        formContainer.appendChild(yodaImage);
        formContainer.appendChild(formHolder);
        formHolder.appendChild(provideNameText);
        formHolder.appendChild(nameForm);
        headerContainer.appendChild(gameOverHeader);
        headerContainer.appendChild(gameOverSubheader);
        nameForm.appendChild(insertName);
        nameForm.appendChild(submitButton);
    }
}