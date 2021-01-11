import QuestionView from '../views/questionView';
import QuestionModel from '../models/questionModel';

export default class QuizController {
    constructor(gameTime, quizType, gameOverHandler, api_url, cachedIds) {
        this.gameTime = gameTime;
        this.quizType = quizType;
        this.gameOverHandler = gameOverHandler;
        this.timeLeft = this.gameTime;
        this.api_url = api_url;
        this.validIds = cachedIds[this.quizType];

        this.currentQuestion = null;
        this.questions = [];
        this.usedIds = [];
    }

    updateTime() {
        //TODO: update timerView here
    }

    async runQuiz() {
        this.timeLeft = this.gameTime;
        await this.generateQuestion();
        let timer = setInterval(() => {
            this.updateTime();
            this.timeLeft = this.timeLeft - 1;
            if (this.timeLeft <= 0) {
                clearInterval(timer);
                this.saveResults();
                this.resetController();
                this.gameOverHandler();
            }
        }, 1000);
    }

    async generateQuestion() {
        // generate id
        const maxIdRange = this.validIds.length;
        let generatedId = this.validIds[Math.floor(Math.random() * maxIdRange)];
        while (this.usedIds.includes(generatedId)) {
            generatedId = this.validIds[Math.floor(Math.random() * maxIdRange)];
        }
        this.usedIds.push(generatedId);

        // make question
        this.currentQuestion = new QuestionModel(this.quizType, generatedId);
        await this.currentQuestion.fetchData(this.api_url, this.validIds);
        this.questions.push(this.currentQuestion);
        
        // display question
        const parent = document.getElementById('swquiz-app');
        const questionView = new QuestionView(parent, this.handleAnswer.bind(this), this.quizType);
        questionView.display(this.currentQuestion.getAnswers());
    }

    async handleAnswer(id) {
        this.currentQuestion.selectAnswer(id);
        await this.generateQuestion();
    }

    resetController() {
        this.currentQuestion = null;
        this.questions = [];
        this.usedIds = [];
    }

    saveResults() {
        const maxPoints = this.questions.length;
        const score = this.questions.reduce((prev, next) => {
            return prev + next.answerIsCorrect();
        }, 0);
        //TODO: ask player for name
        //TODO: save results in memory
    }
}