import { Cell } from "./Cell";
import { getRandomIndexes } from "./Utils";

export class Board {
  cells: Cell[] = [];
  element: HTMLElement;

  constructor(container: HTMLElement, rows: number, cols: number) {
    this.element = container;
    this.init();
  }

  init() {
    this.cells = [];
    this.element.innerHTML = "";

    for (let i = 0; i < 25; i++) {
      const cell = new Cell();
      this.cells.push(cell);
      this.element.appendChild(cell.element);
    }
  }

  placeMines(count: number) {
    const indexes = getRandomIndexes(count, 25);
    indexes.forEach((i) => {
      this.cells[i].hasMine = true;
    });
  }

  reset() {
    this.cells.forEach((cell) => cell.reset());
  }
}
