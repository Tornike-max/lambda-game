export class Cell {
  element: HTMLDivElement;
  hasMine: boolean = false;
  isRevealed: boolean = false;

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("cell");
  }

  reveal() {
    this.isRevealed = true;
    this.element.classList.add(this.hasMine ? "mine" : "safe");
  }

  reset() {
    this.isRevealed = false;
    this.hasMine = false;
    this.element.className = "cell";
  }
}
