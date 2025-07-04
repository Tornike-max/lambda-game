export function setupBetInput() {
  const popup = document.getElementById("keypadPopupOverlay");
  const betInput = document.getElementById("betInputField") as HTMLInputElement;
  const betDisplay = document.getElementById("bet") as HTMLInputElement;
  const popupOpenImage = document.getElementById("popup-open");
  const keys = document.querySelectorAll(".key");
  const deleteKey = document.getElementById("deleteKey");
  const confirmBtn = document.getElementById("confirmBet");
  const increaseBetBtn = document.getElementById("increase");
  const decreaseBetBtn = document.getElementById("decrease");

  if (!popup || !betInput || !betDisplay || !confirmBtn || keys.length === 0) return;

  const openPopupButtons = [betInput, betDisplay, popupOpenImage];

  openPopupButtons.forEach(element => {
    element?.addEventListener("click", () => {
      popup.classList.add("show");
      betInput.value = betDisplay.value;
    });
  });

  increaseBetBtn?.addEventListener("click", () => {
    const current = Number(betDisplay.value);
    if (current >= 100000) {
      alert("⛔ მაქსიმალური ფსონი 100000 ლარია");
      return;
    }
    betDisplay.value = (current + 0.5).toFixed(2);
  });

  decreaseBetBtn?.addEventListener("click", () => {
    const current = Number(betDisplay.value);
    if (current > 0) {
      betDisplay.value = Math.max(0, current - 0.5).toFixed(2);
    }
  });

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      if (betInput.readOnly) betInput.readOnly = false;
      betInput.value += key.textContent;
    });
  });

  deleteKey?.addEventListener("click", () => {
    betInput.value = betInput.value.slice(0, -1);
  });

  confirmBtn.addEventListener("click", () => {
    betDisplay.value = betInput.value;
    popup.classList.remove("show");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });
}
