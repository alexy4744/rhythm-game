import { Container } from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Lane from "@/structures/Game/UI/Lane";

import HitArea from "@/structures/Game/UI/Lane/Components/HitArea";
import Note from "@/structures/Game/UI/Lane/Components/NoteField/Note";

import Body from "@/structures/Game/UI/Lane/Components/NoteField/HoldNote/Pieces/Body";
import Head from "@/structures/Game/UI/Lane/Components/NoteField/HoldNote/Pieces/Head";
import Tail from "@/structures/Game/UI/Lane/Components/NoteField/HoldNote/Pieces/Tail";

import lerp from "@/utils/lerp";

class HoldNote extends Note {
  private _container = new Container();

  private _destroyed = false;

  private _head = new Head(this);
  private _body = new Body(this);
  private _tail = new Tail(this);

  public constructor(lane: Lane, start: number, private _end: number) {
    super(lane, start);
  }

  public get body() {
    return this._body;
  }

  public get container() {
    return this._container;
  }

  public get destroyed() {
    return this._destroyed;
  }

  public get end() {
    return this._end;
  }

  public get head() {
    return this._head;
  }

  public get height() {
    return this.head.sprite.height + this.body.sprite.height + this.tail.sprite.height;
  }

  public get judgeable() {
    return true;
  }

  public get tail() {
    return this._tail;
  }

  public destroy() {
    if (this.destroyed) return;

    this._destroyed = true;
    this.container.destroy();
  }

  public hit() {
    
  }

  public initialize() {
    this.body.initialize(); // MUST INITIALIZE FIRST, HEAD AND TAIL DEPENDS ON THIS
    this.head.initialize();
    this.tail.initialize();

    this.container.addChild(
      this.head.sprite,
      this.body.sprite,
      this.tail.sprite
    );

    return this;
  }

  public update() {
    if (this.destroyed) return;

    const songPosition = this.lane.game.audio.getTrackPosition(AudioAliases.BeatmapTrack, 0);

    if (!songPosition) return;
    if (songPosition > this.end) return this.destroy();

    const { crotchet } = this.lane.game.beatmap;

    const songPositionInBeats = songPosition / crotchet;
    const currentNoteInBeats = this.start / crotchet;

    const progress = 1 - (currentNoteInBeats - songPositionInBeats) / this.lane.noteField.speed;
    this.container.y = lerp(-(HitArea.HEIGHT * 2), HitArea.Y, progress);
  }
}

export default HoldNote;
