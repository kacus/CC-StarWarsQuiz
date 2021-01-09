export default class MenuView{
    constructor(parent, typeSelectionHandler){
        this.parent = parent //document.getElementById('swquiz-app'); //testing!!!!
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
            menuBtn.innerText = cat;
            menuBtn.addEventListener('click', () => this.typeSelectionHandler(cat));
            menuContainer.appendChild(menuBtn);
        });
        this.parent.innerHTML = "";
        this.parent.appendChild(menuContainer);
    }
}
// MOCKUP FOR TESTING - move it to controller
// export function typeSelectionHandler(param) {
//     console.log(`selected category: ${param}`);
// }