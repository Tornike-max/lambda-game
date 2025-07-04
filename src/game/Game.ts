import * as PIXI from "pixi.js";
import { Board } from "./Board";

export class Game {
  app!: PIXI.Application;
  board!: Board;

  constructor() {}

  async init(container: HTMLElement) {
    this.app = new PIXI.Application({
    width: 400,
    height: 400,
    backgroundColor: 0x222222,
    });

    await this.app.init?.(); 


    container.appendChild(this.app.canvas)
    this.board = new Board(container,5,5);

  }
}
