import { Board } from "../game/Board";

export class GameController {
  board: Board;
  mineCount: number;
  isGameActive: boolean = false;

  constructor(boardContainer: HTMLElement) {
    this.board = new Board(boardContainer,5,5);
    this.mineCount = 3;

    this.attachEvents();
  }

  startGame() {
    this.isGameActive = true;
    this.board.reset();
    this.board.placeMines(this.mineCount);

    this.board.cells.forEach((cell) => {
      cell.element.onclick = () => {
        if (!this.isGameActive || cell.isRevealed) return;

        cell.reveal();

        if (cell.hasMine) {
          alert("💥 Lost!");
          this.isGameActive = false;
        } else {
          // todo: კოეფიციენტის ზრდა, მოგების დათვლა
        }
      };
    });
  }

  attachEvents() {
    document.getElementById("bet-btn")?.addEventListener("click", () => {
      this.startGame();
    });

    const dropdown = document.getElementById("mine-count") as HTMLSelectElement;
    dropdown?.addEventListener("change", () => {
      this.mineCount = parseInt(dropdown.value);
    });
  }
}
