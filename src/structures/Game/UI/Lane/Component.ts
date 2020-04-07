import { Sprite } from "pixi.js";

import Lane from "@/structures/Game/UI/Lane";

abstract class Component {
  public static readonly WIDTH = 90;

  private _destroyed = false;
  private _sprite = new Sprite();

  public constructor(private _lane: Lane) { }

  public get destroyed() {
    return this._destroyed;
  }

  public get game() {
    return this.lane.game;
  }

  public get lane() {
    return this._lane;
  }

  public get sprite() {
    return this._sprite;
  }

  public destroy() {
    if (this.destroyed) return;

    this.sprite.destroy();
    this._destroyed = true;
  }

  public initialize() {
    this.sprite.width = Component.WIDTH;
    this.sprite.x = this.lane.index * this.sprite.width;

    return this;
  }

  public abstract update(): void;
};

export default Component;
