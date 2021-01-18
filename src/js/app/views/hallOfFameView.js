export default class HallOfFameView {
  constructor(parent) {
    this.parent = parent;
  }

  // Create an element with an optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  display() {
    //get highScores from localStorage
    const highScores = !JSON.parse(localStorage.getItem('HighScores'))
      ? []
      : JSON.parse(localStorage.getItem('HighScores'));

    //create wrapper for hallOfFame
    const hofWrapper = this.createElement('div', 'hof__wrapper');
    this.parent.appendChild(hofWrapper);

    if (highScores.length > 0) {
      //create table elements
      const hofTable = this.createElement('table', 'hof__table');
      const hofTableHeading = this.createElement('caption', 'hof__table-heading');
      const hofTableRow = this.createElement('tr', 'hof__table-row');
      const titles = ['place', 'name', 'result'];

      //create table
      hofWrapper.appendChild(hofTable);
      hofTable.appendChild(hofTableHeading);
      hofTableHeading.innerText = 'Mode Ranking';

      //create row with column titles
      hofTable.appendChild(hofTableRow);
      titles.forEach((title, index) => {
        const hofTableCell = this.createElement('td', 'hof__table-cell');
        hofTableRow.appendChild(hofTableCell);
        // index === 2 ? hofTableCell.colSpan = "2" : null;
        hofTableCell.innerText = title;
      });

      //add content to table
      highScores.forEach((res, index) => {
        const hofTableRow = this.createElement('tr', 'hof__table-row');
        hofTable.appendChild(hofTableRow);
        const hofTableRowNumber = this.createElement('td', 'hof__table-cell');
        hofTableRow.appendChild(hofTableRowNumber);
        hofTableRowNumber.innerText = index + 1;
        res.forEach((score) => {
          const hofTableCell = this.createElement('td', 'hof__table-cell');
          hofTableRow.appendChild(hofTableCell);
          hofTableCell.innerText = score;
        });
      });
      document.querySelectorAll('td:nth-child(4)').forEach((el) => {
        el.innerText = ` / ` + el.innerText;
      });
    } else {
      const noResultsHeading = this.createElement('h2', 'hof__no-results-info');
      noResultsHeading.innerText = 'No results to show';
      //create 'no results to show' display
      hofWrapper.appendChild(noResultsHeading);
    }
  }
}
