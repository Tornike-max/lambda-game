import { Board } from "../game/Board";
import { formatMultiplier, formatUSD } from "../utils/formatters";

export class GameController {
  board: Board;
  mineCount: number;
  isGameActive: boolean = false;
  revealedSafeCells: number = 0;
  totalCoefficient: number = 1;
  nextMultiplierSpan: HTMLElement | null;
  currentMultiplierSpan: HTMLElement | null;
  cashoutButton: HTMLButtonElement | null;
  autoButton: HTMLButtonElement | null = null;
  randomButton: HTMLButtonElement | null = null;

  balance: number = 50000;
  balanceDisplay: HTMLElement | null;

  constructor(boardContainer: HTMLElement) {
    this.board = new Board(boardContainer, 5, 5);
    this.mineCount = 3;
    this.nextMultiplierSpan = document.querySelector(".next-multiplier");
    this.currentMultiplierSpan = document.querySelector(".current-multiplier");
    this.cashoutButton = document.getElementById("cashout-btn") as HTMLButtonElement;
    this.balanceDisplay = document.getElementById("balanceAmount");
    this.autoButton = document.getElementById("auto-btn") as HTMLButtonElement;
    this.randomButton = document.getElementById("random-btn") as HTMLButtonElement;

    if (this.randomButton) {
      this.randomButton.addEventListener("click", () => this.clickRandomCell());
      this.randomButton.disabled = true;
    }
    if (this.autoButton) {
      this.autoButton.addEventListener("click", () => this.toggleAutoGame());
    }
    this.attachEvents();
    this.updateBalanceUI();

    if (this.cashoutButton) {
      this.cashoutButton.addEventListener("click", () => this.cashout());
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

  updateBalanceUI() {
    if (this.balanceDisplay) {
      this.balanceDisplay.textContent = formatUSD(this.balance);
    }
  }

  startGame() {
    const betInput = document.getElementById("bet") as HTMLInputElement;
    const betAmount = parseFloat(betInput.value);

    if (isNaN(betAmount) || betAmount <= 0) {
      alert("⛔ მიუთითე სწორი თანხა");
      return;
    }

    if (betAmount > this.balance) {
      alert("⛔ ბალანსზე მეტი თანხა არ შეგიძლია დადო!");
      return;
    }

    this.balance -= betAmount;
    this.updateBalanceUI();

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
          alert("💣 თამაში დასრულდა! შენ წააგე!");
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

  clickRandomCell() {
    if (!this.isGameActive) {
      alert("⛔ ჯერ თამაში დაიწყე");
      return;
    }

    const isAutoMode = this.autoButton?.textContent === "⏹ Stop";
    if (!isAutoMode) {
      alert("⛔ ჯერ ჩართე Auto რეჟიმი რომ რენდომ იმუშაოს");
      return;
    }

    const unrevealedCells = (this.board.cells as any[]).filter(cell => !cell.isRevealed);

    if (unrevealedCells.length === 0) {
      alert("✅ ყველა უჯრედი უკვე გახსნილია");
      return;
    }

    const randomIndex = Math.floor(Math.random() * unrevealedCells.length);
    const cell = unrevealedCells[randomIndex];
    cell.element.click();
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
      this.nextMultiplierSpan.textContent = `Next: ${formatMultiplier(nextMultiplier)}`;
    }
    if (this.currentMultiplierSpan) {
      this.currentMultiplierSpan.textContent = `Total: ${formatMultiplier(this.totalCoefficient)}`;
    }
  }

  toggleAutoGame() {
    if (!this.isGameActive || !this.autoButton) return;

    const isActive = this.autoButton.textContent === "⏹ Stop";

    this.autoButton.textContent = isActive ? "🎲 Auto" : "⏹ Stop";

    if (this.randomButton) {
      this.randomButton.disabled = isActive; 
    }
  }


  autoStep() {
    const unrevealedCells = (this.board.cells as any[]).filter(cell => !cell.isRevealed);
    if (unrevealedCells.length === 0) {
      this.toggleAutoGame(); 
      return;
    }
    const randomIndex = Math.floor(Math.random() * unrevealedCells.length);
    const cell = unrevealedCells[randomIndex];

    cell.element.click();

    if (!this.isGameActive) {
      this.toggleAutoGame();
      return;
    }
  }

  cashout() {
    if (!this.isGameActive) return;

    const betInput = document.getElementById("bet") as HTMLInputElement;
    const betAmount = parseFloat(betInput.value);
    const winnings = betAmount * this.totalCoefficient;

    alert(`✅ You cashed out: $${winnings.toFixed(2)} 💰 (x${this.totalCoefficient.toFixed(2)})`);

    this.balance += winnings;
    this.updateBalanceUI();

    this.isGameActive = false;

    if (this.cashoutButton) {
      this.cashoutButton.disabled = true;
    }
  }
}
