import { Sprite, Texture } from "pixi.js";

import HoldNote from "@/structures/Game/UI/Lane/Components/NoteField/HoldNote";

abstract class Piece {
  private _sprite = new Sprite();

  public constructor(private _holdNote: HoldNote) { }

  public get game() {
    return this.lane.game;
  }

  public get holdNote() {
    return this._holdNote;
  }

  public get lane() {
    return this.holdNote.lane;
  }

  public get sprite() {
    return this._sprite;
  }

  public initialize() {
    this.sprite.alpha = 0.75;
    this.sprite.texture = Texture.WHITE;

    return this;
  }
}

export default Piece;
