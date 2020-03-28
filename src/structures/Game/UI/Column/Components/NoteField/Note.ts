import * as PIXI from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Column from "@/structures/Game/UI/Column";
import Component from "@/structures/Game/UI/Column/Component";

import HitArea from "@/structures/Game/UI/Column/Components/HitArea";

import NoteType from "@/types/Beatmap/Note";

import lerp from "@/utils/lerp";

class Note extends Component implements NoteType {
  public static readonly HEIGHT = 16;

  public constructor(
    column: Column,
    private _position: number,
    private _start: number,
    private _end?: number
  ) {
    super(column);
  }

  public get end() {
    return this._end;
  }

  public get position() {
    return this._position;
  }

  public get start() {
    return this._start;
  }

  public initialize() {
    super.initialize();

    this.sprite.alpha = 0.75;
    this.sprite.height = Note.HEIGHT;
    this.sprite.texture = PIXI.Texture.WHITE;
    this.sprite.y = -Note.HEIGHT; // Spawn just above the notefield

    return this;
  }

  public update() {
    if (this.destroyed) return;

    const songPosition = this.game.audio.getTrackPosition(AudioAliases.BeatmapTrack, 0);
    if (!songPosition) return;

    const { crotchet } = this.game.staff;

    const songPositionInBeats = songPosition / crotchet;
    const currentNoteInBeats = this.start / crotchet;

    if (songPositionInBeats > currentNoteInBeats && !this.destroyed) {
      return this.destroy();
    }

    const progress = 1 - (currentNoteInBeats - songPositionInBeats) / this.column.noteField.speed;

    this.sprite.y = lerp(-Note.HEIGHT, HitArea.Y, progress);
  }
}

export default Note;
