import * as PIXI from "pixi.js";

import Column from "@/structures/Game/UI/Column";

abstract class Component {
  public static readonly WIDTH = 72;

  private _sprite = new PIXI.Sprite();

  public constructor(private _column: Column) {}

  public get column() {
    return this._column;
  }

  public get game() {
    return this.column.game;
  }

  public get sprite() {
    return this._sprite;
  }

  public initialize() {
    this.sprite.width = Component.WIDTH;
    this.sprite.x = this.column.index * this.sprite.width;

    return this;
  }

  public abstract update(): void;
};

export default Component;
