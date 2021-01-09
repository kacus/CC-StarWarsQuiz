export default class GameOverView {
    constructor(parent,submitNameHandler){
        this.parent = parent;
        this.submitNameHandler = submitNameHandler();
    }

    createElement(tag, className){
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    display(){
        const formContainer = this.createElement('div','form__container');
        const nameForm = this.createElement('form','name__form');
        const insertName = this.createElement('input', 'insert__name');
        insertName.type='text';
        insertName.setAttribute('maxlength','20');
        insertName.setAttribute('pattern','[a-zA-Z0-9]')
        const submitButton = this.createElement('input', 'submit__button');
        submitButton.type='submit';
        submitButton.value='MAY THE FORCE BE WITH YOU!';
        submitButton.addEventListener('click', ()=>this.submitNameHandler());

        this.parent.appendChild(formContainer);
        formContainer.appendChild(nameForm);
        nameForm.appendChild(insertName);
        nameForm.appendChild(submitButton);
    }
}