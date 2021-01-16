export default class QuestionModel {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }
  async fetchData(api_url, validIds) {
    //catch correct answer
    let data = await fetch(`${api_url}/${this.type}/${this.id}/`)
      .then((response) => response.json())
      .catch(_ => console.log('invalid id: ', currentId));
    this.answers = [
      [this.id, data.name]
    ];

    //catch rest of answers
    const maxIdRange = validIds.length;
    for (let i = 0; i < 3; i++) {
      let currentName;
      let currentId;
      currentId = validIds[Math.floor(Math.random() * maxIdRange)];
      while (this.answers.some((x) => x[0] === currentId)) {
        currentId = validIds[Math.floor(Math.random() * maxIdRange)];
      }

      currentName = await fetch(`${api_url}/${this.type}/${currentId}/`)
        .then((response) => response.json())
        .then((data) => data.name)
        .catch(_ => console.log('invalid id: ', currentId));

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