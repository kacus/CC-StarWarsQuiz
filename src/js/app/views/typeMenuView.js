export default class MenuView{
    constructor(parent, typeSelectionHandler){
        this.parent = parent;
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
        const menuContainer = this.createElement('div', 'menu');
        this.categories.forEach((cat) => {
            const menuBtn = this.createElement('button', 'menu__button');
            menuBtn.innerText = cat;
            menuBtn.addEventListener('click', () => this.typeSelectionHandler(cat));
            menuContainer.appendChild(menuBtn);
        });
        this.parent.appendChild(menuContainer);
    }
}
