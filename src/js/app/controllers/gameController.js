import QuizController from './quizController'
import MenuView from '../views/typeMenuView'

export default class GameController{
    constructor(rootElement, gameTime, api_url){
        this.rootElement = rootElement;
        this.gameTime = gameTime;
        this.api_url = api_url;
    }

    runApp(){
        this.gameMenu();
    }

    selectMode(mode){
        const quiz = new QuizController(this.gameTime, mode, this.gameMenu.bind(this), this.api_url);
        this.rootElement.innerHTML = '';
        quiz.runQuiz();
    }

    gameMenu(){
        this.rootElement.innerHTML = '';
        const menu = new MenuView(this.rootElement, this.selectMode.bind(this));
        menu.display();
    }
}