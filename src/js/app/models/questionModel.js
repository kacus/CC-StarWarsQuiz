export default class QuestionModel {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }
  async fetchData() {
    let data = await fetch(`https://swapi.dev/api/${this.type}/${this.id}/`)
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

      let currentName = await fetch(`https://swapi.dev/api/${this.type}/${currentId}/`)
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
    return this.fetchData();
  }
  async getCorrectAnswer() {
    let answers = await this.getAnswers();
    return answers[0];
  }
  selectAnswer(id) {
    this.userAnswer = id;
    return this.userAnswer;
  }
  async answersCorrect(id) {
    let correctId = await this.getCorrectAnswer();
    if(this.selectAnswer(id)=== correctId[0]){
      return true;

    }
    else{
      return false;
    }
  }
}