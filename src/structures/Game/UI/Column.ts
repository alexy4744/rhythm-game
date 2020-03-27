import * as PIXI from "pixi.js";

import Game from "@/structures/Game";

import HitArea from "@/structures/Game/UI/Column/Components/HitArea";
import Key from "@/structures/Game/UI/Column/Components/Key";
import NoteField from "@/structures/Game/UI/Column/Components/NoteField";

class Column {
  private _container = new PIXI.Container();

  private _hitArea = new HitArea(this);
  private _key = new Key(this);
  private _noteField = new NoteField(this);

  public constructor(
    private _game: Game,
    private _index: number
  ) { }

  public get container() {
    return this._container;
  }

  public get game() {
    return this._game;
  }

  public get hitArea() {
    return this._hitArea;
  }

  public get index() {
    return this._index;
  }

  public get key() {
    return this._key;
  }

  public get noteField() {
    return this._noteField;
  }

  public initialize() {
    this.hitArea.initialize();
    this.key.initialize();
    this.noteField.initialize();

    this.container.addChild(
      this.noteField.sprite,
      this.hitArea.sprite,
      this.key.sprite
    );

    return this;
  }

  public update() {
    this.noteField.update();
    this.hitArea.update();
    this.key.update();
  }
}

export default Column;
