import { GameController } from './controllers/GameController';
import './styles.scss';


const boardContainer = document.getElementById("board")!;
const game = new GameController(boardContainer);

