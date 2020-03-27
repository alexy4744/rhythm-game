import * as PIXI from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Column from "@/structures/Game/UI/Column";
import Component from "@/structures/Game/UI/Column/Component";

import HitArea from "@/structures/Game/UI/Column/Components/HitArea";
import NoteField from "@/structures/Game/UI/Column/Components/NoteField";

import NoteType from "@/types/Beatmap/Note";

import lerp from "@/utils/lerp";

class Note extends Component implements NoteType {
  public static readonly HEIGHT = 32;

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
    const songPosition = this.game.audio.getTrackPosition(AudioAliases.BeatmapTrack, 0);
    if (!songPosition) return;

    const { staff } = this.game;

    const songPositionInBeats = (songPosition / 1000) / staff.crotchet;
    const currentNoteInBeats = this.start / staff.crotchet;

    if (songPositionInBeats > currentNoteInBeats) return;

    // https://www.reddit.com/r/gamedev/comments/4ayt6w/best_way_of_coding_the_movement_of_notes_in_a/d14n8j4/
    this.sprite.y = lerp(
      -Note.HEIGHT,
      HitArea.Y,
      1 - (currentNoteInBeats - songPositionInBeats) / NoteField.BEATS_SHOWN_IN_ADVANCE
    );
  }
}

export default Note;
