import { doc } from "prettier";

import QuizController from './controllers/quizController'

export const App = ({ options }) => {
    const root = document.getElementById('swquiz-app');
    const x = new QuizController(options.quizMaxTime, 'people', ()=> console.log('GameOver'), options.swApiBaseUrl);
    x.runQuiz();
};
