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
  const popupOpenImage = document.getElementById("popup-open");
  const keys = document.querySelectorAll(".key");
  const deleteKey = document.getElementById("deleteKey");
  const confirmBtn = document.getElementById("confirmBet");
  const increaseBetBtn = document.getElementById("increase");
  const decreaseBetBtn = document.getElementById("decrease");

  if (!popup || !betInput || !betDisplay || !confirmBtn || keys.length === 0) {
    console.warn("⚠️ Popup elements not found in DOM.");
    return;
  }

  const openPopupButtons = [betInput, betDisplay,popupOpenImage];

  openPopupButtons.forEach(element => {
    element?.addEventListener("click",()=>{
      popup.classList.add("show");
      betInput.value = betDisplay.value;
    })
  });
  increaseBetBtn?.addEventListener("click", () => {
    const current = Math.floor(Number(betDisplay.value));

    if(current >= 100000) {
      alert("⛔ მაქსიმალური ფსონი 100000 ლარია");
      return;
    }

    betDisplay.value = String(Number(betDisplay.value) + 0.50);
  })

  decreaseBetBtn?.addEventListener("click", () => {
    const current = Math.floor(Number(betDisplay.value));
    if (current > 0) {
      betDisplay.value = String(current - 0.50);
    }
  });


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
