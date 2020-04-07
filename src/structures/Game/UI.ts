import { Container, UPDATE_PRIORITY} from "pixi.js";

import Game from "@/structures/Game";

import Lane from "@/structures/Game/UI/Lane";

class UI {
  public static readonly MAX_COLUMNS = 10; // You don't have more than 10 fingers
  public static readonly MIN_COLUMNS = 1;

  private _lanes: Lane[] = [];

  public constructor(private _game: Game) {
    this.createColumns();
  }

  public get game() {
    return this._game;
  }

  public get lanes() {
    return this._lanes;
  }

  private createColumns() {
    const amount = this.game.beatmap.metadata.lanes;
    
    if (!amount || amount < UI.MIN_COLUMNS || amount > UI.MAX_COLUMNS) {
      throw new RangeError(`The amount of lanes must be between ${UI.MIN_COLUMNS} and ${UI.MAX_COLUMNS}`);
    }

    const lanes = new Container();
    
    this.game.stage.addChild(lanes);

    for (let i = 0; i < amount; i += 1) {
      const lane = new Lane(this.game, i).initialize();

      this.game.ticker.add(() => lane.update(), this, UPDATE_PRIORITY.INTERACTION);
      this.lanes.push(lane);

      lanes.addChild(lane.container);
    }

    lanes.x = (window.innerWidth / 2) - (lanes.width / 2)
  }
}

export default UI;
