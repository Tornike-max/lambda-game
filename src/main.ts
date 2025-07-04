import { GameController } from './controllers/GameController';
import './styles.scss';
import { setupAgeModal } from './ui/ageModal';
import { setupBetInput } from './ui/BetInput';

console.log("MAIN STARTED");

window.addEventListener("DOMContentLoaded", () => {
  setupAgeModal();
  setupBetInput();

  const boardContainer = document.getElementById("board");
  if (boardContainer) {
    new GameController(boardContainer);
  } else {
    console.error("❌ Board container not found");
  }
});
