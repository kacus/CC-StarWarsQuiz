export default class MenuView{
    constructor(parent, typeSelectionHandler){
        this.parent = paerent;
        this.categories = ['people', 'vehicles', 'starships'];
        this.typeSelectionHandler = typeSelectionHandler;
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className){
            element.classList.add(className);
        } 
        return element;
    }
    display(){
        const menuContainer = this.createElement('div', 'menu__container');
        this.categories.forEach((cat) => {
            const menuBtn = this.createElement('button', 'menu__button');
            menuButton.innerText = cat;
            menuButton.addEventListener('click', () => this.typeSelectionHandler());
            menuContainer.appendChild(menuBtn);
        });
        
        this.parent.innerHTML = "";
        this.parent.appendChild(menuContainer);
    }
}