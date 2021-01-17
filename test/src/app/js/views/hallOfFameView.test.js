import hallOfFameView from '../../../../../src/js/app/views/hallOfFameView';

const hof = new hallOfFameView()

test('object assignment', () => {
  localStorage.setItem('highScores', JSON.stringify([['p33', 10, 20],['p1', 9,22]]))
  expect(JSON.parse(localStorage.getItem('highScores'))).toStrictEqual([['p33', 10, 20],['p1', 9,22]])
  hof.display()
  console.log(document.getElementById('app'));
  
});