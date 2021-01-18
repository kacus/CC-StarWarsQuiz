import HallOfFameView from '../views/hallOfFameView'

export default class MenuView{
    constructor(parent, typeSelectionHandler){
        this.parent = parent;
        this.typeSelectionHandler = typeSelectionHandler;
        this.categories = [{name: 'people',
                            shortDesc: 'Who is this character?',
                            longDesc: 'You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select which character from Star Wars is showed on the left (Jar Jar Binks right now) from available options.'},
                            {name: 'vehicles',
                            shortDesc: 'Do you recognize this vehicle?',
                            longDesc: 'You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select which vehicle from Star Wars is showed on the left.'},
                            {name: 'starships',
                            shortDesc: 'Do you recognize this starship?',
                            longDesc: 'You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select which starship from Star Wars is showed on the left.'}];
        this.selectedCategory = 'people';
    }
    toggleButton(btnElem, cat){
        const resetBtns = this.parent.getElementsByClassName('menu__button menu__button--clicked');
        resetBtns[0].classList.remove('menu__button--clicked');
        btnElem.classList.toggle('menu__button--clicked');
        let shortDescElem = this.parent.getElementsByClassName('shortDesc');
        let longDescElem = this.parent.getElementsByClassName('longDesc');
        shortDescElem[0].innerText = cat.shortDesc;
        longDescElem[0].innerHTML = cat.longDesc;
        
        this.selectedCategory = cat.name; 
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className){
            element.classList.add(className);
        } 
        return element;
    }
    display(){
        const mainContainer = this.createElement('div', 'main');
        const menuContainer = this.createElement('div', 'menu');
        this.categories.forEach((cat) => {
            const menuBtn = this.createElement('p', 'menu__button');
            if(cat.name === 'people'){
                menuBtn.classList.add('menu__button--clicked')
            }
            menuBtn.innerText = cat.name;
            menuBtn.addEventListener('click', () => this.toggleButton(menuBtn, cat));
            menuContainer.appendChild(menuBtn);
        });
        const logoImgContainer = this.createElement('div', 'logo');
        const logoImg = this.createElement('img', 'logo__img');
        logoImg.src = "./static/assets/ui/StarWarsLogo.png";
        logoImg.alt = 'SW LOGO';
        logoImgContainer.appendChild(logoImg);
        const questionImg = this.createElement('div', 'question__image');
        const shortDesc = this.createElement('div', 'shortDesc');
        shortDesc.innerHTML = this.categories[0].shortDesc;
        const longDesc = this.createElement('div', 'longDesc');
        longDesc.innerHTML = this.categories[0].longDesc;

        const buttonContainer = this.createElement('div', 'buttonContainer')
        const hofButton = this.createElement('button', 'halloffame__button');
        hofButton.innerText = 'Hall of Fame';
        hofButton.addEventListener('click', () => {
            this.parent.innerHTML = "";
            const hof = new HallOfFameView(this.parent);
            hof.display();
        });
        const startButton = this.createElement('button', 'start__button');
        startButton.innerText = 'Play the game';
        startButton.addEventListener('click', () => this.typeSelectionHandler(this.selectedCategory));

        buttonContainer.appendChild(hofButton);
        buttonContainer.appendChild(startButton);

        mainContainer.appendChild(menuContainer);
        mainContainer.appendChild(logoImgContainer);

        mainContainer.appendChild(questionImg);
        mainContainer.appendChild(shortDesc);
        mainContainer.appendChild(longDesc);
        mainContainer.appendChild(buttonContainer);

        
        this.parent.appendChild(mainContainer);
    }
}
