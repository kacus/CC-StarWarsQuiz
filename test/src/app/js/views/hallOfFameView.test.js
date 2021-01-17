import hallOfFameView from '../../../../../src/js/app/views/hallOfFameView';

//clear local storage before each test

describe('How HallOfFame is being rendered based on different local.storage values', () => {
  afterEach(() => {
    document.querySelector('#swquiz-app').innerHTML = '';
  });
  beforeEach(() => {
    localStorage.clear();
  });
  document.body.innerHTML = `<div id="swquiz-app"></div>`;
  const newParent = document.getElementById('swquiz-app');
  const hof = new hallOfFameView(newParent);

  test('displaying HoF with empty local storage should result in showing h2 element with text "No results to show"', () => {
    localStorage.setItem('highScores', JSON.stringify([]));

    hof.display();
    const text = document.querySelector('.hof__no-results-info').innerText;
    expect(text).toBe('No results to show');
  });

  test('given 6 players results in localStorage creates HTML structure with table to display the results', () => {
    document.body.innerHTML = `<div id="swquiz-app"></div>`;

    localStorage.setItem(
      'highScores',
      JSON.stringify([
        ['p1', 10, 20],
        ['p2', 9, 22],
        ['p3', 8, 22],
        ['p4', 7, 22],
        ['p4', 6, 22],
      ]),
    );
    hof.display();

    const displayedTable =
      '<div class="hof__wrapper"><table class="hof__table"><thead class="hof__table-heading"></thead><tr class="hof__table-row"><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td></tr><tr class="hof__table-row"><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td></tr><tr class="hof__table-row"><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td></tr><tr class="hof__table-row"><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td></tr><tr class="hof__table-row"><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td></tr><tr class="hof__table-row"><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td><td class="hof__table-cell"></td></tr></table></div>';

    expect(newParent.innerHTML).toBe(displayedTable);
  });
});
