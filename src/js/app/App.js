import GameController from './controllers/gameController'

export const App = ({ options }) => {
    const root = document.getElementById('swquiz-app');
    const main_controller = new GameController(root, options.quizMaxTime, options.swApiBaseUrl);
    main_controller.runApp();
};
