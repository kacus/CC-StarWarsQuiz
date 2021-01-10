export default class QuestionModel {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }
  async fetchData(api_url) {
    console.log(`${api_url}/${this.type}/${this.id}/`);
    let data = await fetch(`${api_url}/${this.type}/${this.id}/`)
      .then((response) => response.json())
      .catch(error => console.log(error));
    this.answers = [
      [this.id, data.name]
    ];
    const maxIdRange = 50;
    for (let i = 0; i < 3; i++) {
      let currentId = Math.floor(Math.random() * maxIdRange) + 1;
      while (this.answers.some((x) => x[0] === currentId)) {
        currentId = Math.floor(Math.random() * maxIdRange) + 1;
      }

      let currentName = await fetch(`${api_url}/${this.type}/${currentId}/`)
        .then((response) => response.json())
        .then((data) => data.name)
        .catch(error => console.log(error));

      this.answers.push([currentId, currentName]);
    }
    return this.answers;
  }

  getType(type) {
    return this.type;
  }
  getAnswers() {
    return this.answers;
  }
  getCorrectAnswer() {
    return this.answers[0];
  }
  selectAnswer(id) {
    this.userAnswer = id;
  }
  answerIsCorrect() {
    return this.userAnswer === this.answers[0][0];
  }
}