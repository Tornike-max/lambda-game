import { Board } from "../game/Board";

export class GameController {
  board: Board;
  mineCount: number;
  isGameActive: boolean = false;
  revealedSafeCells: number = 0;
  totalCoefficient: number = 1;
  nextMultiplierSpan: HTMLElement | null;
  currentMultiplierSpan: HTMLElement | null;
  cashoutButton: HTMLButtonElement | null;

  

  constructor(boardContainer: HTMLElement) {
    this.board = new Board(boardContainer, 5, 5);
    this.mineCount = 3;
    this.nextMultiplierSpan = document.querySelector(".next-multiplier");
    this.currentMultiplierSpan = document.querySelector(".current-multiplier");
    this.attachEvents();
    this.cashoutButton = document.getElementById("cashout-btn") as HTMLButtonElement;
    if (this.cashoutButton) {
      this.cashoutButton.addEventListener("click", () => this.cashout());
    }
  }

  startGame() {
    this.isGameActive = true;
    this.revealedSafeCells = 0;
    this.totalCoefficient = 1;

    this.board.reset();
    this.board.placeMines(this.mineCount);
    this.updateNextMultiplier();

    interface ICell {
      element: HTMLElement;
      isRevealed: boolean;
      hasMine: boolean;
      reveal: () => void;
    }

    (this.board.cells as ICell[]).forEach((cell: ICell) => {
      cell.element.onclick = (): void => {
        if (!this.isGameActive || cell.isRevealed) return;
        cell.reveal();

        if (cell.hasMine) {
          this.isGameActive = false;

          if (this.cashoutButton) {
            this.cashoutButton.disabled = true;
          }
        } else {
          this.revealedSafeCells++;

          const nextCoeff: number = this.getNextStepMultiplier();
          this.totalCoefficient *= nextCoeff;

          this.updateNextMultiplier();
        }
      };
    });

    if (this.cashoutButton) {
      this.cashoutButton.disabled = false;
    }
  }

  getNextStepMultiplier(): number {
    const totalCells = this.board.cells.length;
    const totalSafeCells = totalCells - this.mineCount;

    const remainingSafe = totalSafeCells - this.revealedSafeCells;
    const remainingCells = totalCells - this.revealedSafeCells;

    if (remainingSafe <= 0 || remainingCells <= 0) return 1;

    const odds = remainingSafe / remainingCells;
    return 1 / odds;
  }

  updateNextMultiplier() {
    const nextMultiplier = this.totalCoefficient * this.getNextStepMultiplier();
    if (this.nextMultiplierSpan) {
      this.nextMultiplierSpan.textContent = `Next: ${nextMultiplier.toFixed(2)}x`;
    }
    if (this.currentMultiplierSpan) {
      this.currentMultiplierSpan.textContent = `Total: ${this.totalCoefficient.toFixed(2)}x`;
    }
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

  cashout() {
    if (!this.isGameActive) return;

    const betInput = document.getElementById("bet") as HTMLInputElement;
    const betAmount = parseFloat(betInput.value);
    const winnings = betAmount * this.totalCoefficient;

    alert(`✅ You cashed out: $${winnings.toFixed(2)} 💰 (x${this.totalCoefficient.toFixed(2)})`);
    this.isGameActive = false;

    if (this.cashoutButton) {
      this.cashoutButton.disabled = true;
    }
  }

}
