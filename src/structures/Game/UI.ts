import * as PIXI from "pixi.js";

import Game from "@/structures/Game";

import Column from "@/structures/Game/UI/Column";

class UI {
  public static readonly MAX_COLUMNS = 10; // You don't have more than 10 fingers
  public static readonly MIN_COLUMNS = 1;

  private _columns: Column[] = [];

  public constructor(private _game: Game) {
    this.createColumns();
  }

  public get columns() {
    return this._columns;
  }

  public get game() {
    return this._game;
  }

  private createColumns(amount = 5) {
    if (amount < UI.MIN_COLUMNS || amount > UI.MAX_COLUMNS) {
      throw new RangeError(`The amount must be between ${UI.MIN_COLUMNS} and ${UI.MAX_COLUMNS}`);
    }

    const columns = new PIXI.Container();
    
    this.game.stage.addChild(columns);

    for (let i = 0; i < amount; i += 1) {
      const column = new Column(this.game, i).initialize();

      this.game.ticker.add(() => column.update());
      this.columns.push(column);

      columns.addChild(column.container);
    }

    columns.x = (window.innerWidth / 2) - (columns.width / 2);
  }
}

export default UI;
