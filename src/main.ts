import { GameController } from './controllers/GameController';
import './styles.scss';


console.log("MAIN STARTED");

const boardContainer = document.getElementById("board");
console.log("Board container:", boardContainer);

if (boardContainer) {
  new GameController(boardContainer);
} else {
  console.error("❌ Board container not found");
}


