import QuestionView from '../views/questionView';
import QuestionModel from '../models/questionModel';
import LightsaberTimerView from '../views/lightsaberTimerView';
import GameOverView from '../views/gameOverView';

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
        this.maxPoints = 0;
        this.score = 0;

        this.root = document.getElementById('swquiz-app');
        this.timerView = new LightsaberTimerView(this.root);

        // container for questions
        this.questionContainer = document.createElement('div');
        this.questionContainer.classList.add('question');
        this.root.appendChild(this.questionContainer);

        // this.root.prepend(this.questionContainer)
    }

    updateTime() {
        this.timerView.updateTime(this.timeLeft, this.gameTime)
    }

    async runQuiz() {
        this.timeLeft = this.gameTime;
        this.timerView.display(this.timeLeft, this.gameTime);
        await this.generateQuestion();
        let timer = setInterval(() => {
            this.updateTime();
            this.timeLeft = this.timeLeft - 1;
            if (this.timeLeft <= 0) {
                clearInterval(timer);
                this.saveResults();
            }
        }, 1000);
    }

    async generateQuestion() {
        // if user answer all questions before time left
        if(this.questions.length === this.validIds.length){
            this.timeLeft = 0;
            return;
        }
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
        const questionView = new QuestionView(this.questionContainer, this.handleAnswer.bind(this), this.quizType);
        questionView.display(this.currentQuestion.getAnswers());
        this.root.prepend(this.questionContainer)
    }

    async handleAnswer(id) {
        this.currentQuestion.selectAnswer(id);
        await this.generateQuestion();
    }

    saveResults() {
        this.maxPoints = this.questions.length;
        this.score = this.questions.reduce((prev, next) => {
            return prev + next.answerIsCorrect();
        }, 0);
        //ask player for name
        const gameOverView = new GameOverView(this.root, this.getNameHandler.bind(this), this.score, this.maxPoints);
        this.root.innerHTML = "";
        gameOverView.display();
        
    }

    getNameHandler(name){
        this.userName = name;
        this.gameOverHandler();
        console.log(`Good job, ${this.userName}! Your score ${this.score}/${this.maxPoints}`);
        //TODO: save results in memory
    }
}