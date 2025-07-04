import { GameController } from './controllers/GameController';
import './styles.scss';

console.log("MAIN STARTED");

document.addEventListener("DOMContentLoaded", () => {
  const boardContainer = document.getElementById("board");

  if (boardContainer) {
    new GameController(boardContainer);
  } else {
    console.error("❌ Board container not found");
  }

  // ⬇️ პოპაპის ლოგიკა — გადატანილია გარეთ
  const popup = document.getElementById("keypadPopupOverlay");
  const betInput = document.getElementById("betInputField") as HTMLInputElement;
  const betDisplay = document.getElementById("bet") as HTMLInputElement;
  const keys = document.querySelectorAll(".key");
  const deleteKey = document.getElementById("deleteKey");
  const confirmBtn = document.getElementById("confirmBet");

  if (!popup || !betInput || !betDisplay || !confirmBtn || keys.length === 0) {
    console.warn("⚠️ Popup elements not found in DOM.");
    return;
  }

  // გახსნა
  betDisplay.addEventListener("click", () => {
    popup.classList.add("show");
    betInput.value = betDisplay.value;
  });

  // ღილაკებზე დაჭერით ციფრების დამატება
  keys.forEach((key) => {
    key.addEventListener("click", () => {
      if (betInput.readOnly) betInput.readOnly = false;
        betInput.value += key.textContent;    
    });
  });

  // delete ღილაკი
  deleteKey?.addEventListener("click", () => {
    betInput.value = betInput.value.slice(0, -1);
  });

  // დადასტურება
  confirmBtn.addEventListener("click", () => {
    betDisplay.value = betInput.value;
    popup.classList.remove("show");
  });

  // overlay-ზე დაჭერა -> დახურვა
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });
});
