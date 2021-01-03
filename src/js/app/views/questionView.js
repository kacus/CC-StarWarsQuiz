export default class QuestionView {
  constructor(parent, answerHandler, type) {
    this.parent = parent;
    this.answerHandler = answerHandler;
    this.type = type;
    this.questionText = `Question: ${this.getQuestionText(type)}`;
  }

  getQuestionText(type) {
    switch (type) {
      case 'people':
        return 'Who is this character?';
      case 'vehicles':
        return 'What vehicle is that?';
      case 'starships':
        return 'What starship is that?';
      default:
        return 'Wrong type selected';
    }
  }

  // Create an element with an optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  shuffleAnswers(array) {
    const shuffledAnswers = [...array];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ];
    }
    return shuffledAnswers;
  }

  display(answers) {
    const shuffledAnswers = this.shuffleAnswers(answers);
    const questionImage = this.createElement('img', 'question__image');
    const questionContainer = this.createElement('div', 'question__container');
    const questionText = this.createElement('h1', 'question__text');
    const answersList = this.createElement('div', 'answers__list');
    shuffledAnswers.forEach((answer) => {
      const answerButton = this.createElement('button', 'answer__btn');
      answerButton.innerText = answer[1];
      answerButton.classList.add('btn');
      answerButton.addEventListener('click', () =>
        this.answerHandler(answer[0]),
      );
      answersList.appendChild(answerButton);
    });
    questionText.innerText = this.questionText;
    questionImage.src = `./static/assets/img/modes/${this.type}/${answers[0][0]}.jpg`;
    this.parent.innerHTML = "";
    this.parent.appendChild(questionImage);
    this.parent.appendChild(questionContainer);
    questionContainer.appendChild(questionText);
    questionContainer.appendChild(answersList);
  }
}
