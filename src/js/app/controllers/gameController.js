import QuizController from './quizController'
import MenuView from '../views/typeMenuView'

export default class GameController {
    constructor(rootElement, gameTime, api_url) {
        this.rootElement = rootElement;
        this.gameTime = gameTime;
        this.api_url = api_url;

        this.cachedValidIds = {
            "people": [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
                38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
                62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
                74, 75, 76, 77, 78, 79, 80, 81
            ],
            "vehicles": [
                4, 6, 7, 8, 14, 16, 18, 19, 20,
                24, 25, 26, 30, 33, 34, 35, 36, 37,
                38, 42, 44, 45, 46, 50, 51, 53, 54,
                55, 56, 57
            ],
            "starships": [
                2, 3, 5, 9, 10, 11, 12, 13, 15,
                17, 21, 22, 23, 27, 28, 29, 31, 32,
                39, 40, 41, 43, 47, 48, 49, 52, 58,
                59, 61, 63
            ]
        };
    }

    runApp() {
        this.gameMenu();
    }

    selectMode(mode) {
        const quiz = new QuizController(this.gameTime, mode, this.gameMenu.bind(this), this.api_url, this.cachedValidIds);
        this.rootElement.innerHTML = '';
        quiz.runQuiz();
    }

    gameMenu() {
        this.rootElement.innerHTML = '';
        const menu = new MenuView(this.rootElement, this.selectMode.bind(this));
        menu.display();
    }
}