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
            const menuBtn = this.createElement('button', 'menu__button');
            menuBtn.innerText = cat.name;
            menuBtn.addEventListener('click', () => this.typeSelectionHandler(cat.name));
            menuContainer.appendChild(menuBtn);
        });
        const logoImgContainer = this.createElement('div', 'logoImg');
        const logoImg = this.createElement('img');
        logoImg.src ="src/styles/StarWarsLogo.png";
        logoImg.alt = 'SW LOGO';
        logoImgContainer.appendChild(logoImg);
        const questionImg = this.createElement('div', 'question__image');
        const shortDesc = this.createElement('div', 'shortDesc');
        shortDesc.innerText = this.categories[0].shortDesc; //MOCKUP!!!!
        const longDesc = this.createElement('div', 'longDesc');
        longDesc.innerText = this.categories[0].longDesc; //MOCKUP

        const buttonContainer = this.createElement('div', 'buttonContainer')
        const hofButton = this.createElement('button', 'halloffame__button');
        hofButton.innerText = 'Hall of Fame';
        const startButton = this.createElement('button', 'start__button');
        startButton.innerText = 'Play the game';

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
