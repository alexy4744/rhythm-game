import * as PIXI from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Component from "@/structures/Game/UI/Column/Component";
import Note from "@/structures/Game/UI/Column/Components/NoteField/Note";

import isEven from "@/utils/isEven";

class NoteField extends Component {
  public static readonly HEIGHT = window.innerHeight - 112;
  public static readonly Y = 0;

  private _notes: Note[] = [];
  private _speed: number = this.game.staff.bps;

  public get notes() {
    return this._notes;
  }

  public get speed() {
    return this._speed;
  }

  public initialize() {
    super.initialize();

    this.sprite.alpha = isEven(this.column.index) ? 0.05 : 0.25;
    this.sprite.height = NoteField.HEIGHT;
    this.sprite.texture = PIXI.Texture.WHITE;
    this.sprite.y = NoteField.Y;

    return this;
  }

  public setSpeed(speed: number) {
    if (speed < 1) throw new RangeError("NoteField speed cannot be less than 1!");

    this._speed = speed;
  }

  public update() {
    this.notes.forEach(note => note.update())

    const songPosition = this.game.audio.getTrackPosition(AudioAliases.BeatmapTrack, 0);
    if (!songPosition) return;

    const { staff } = this.game;
    const { currentNote } = staff;

    if (!currentNote || currentNote.position !== this.column.index) return;

    const songPositionInBeats = (songPosition / 1000) / staff.crotchet;
    const currentNoteInBeats = currentNote.start / staff.crotchet;

    // song position in beats > current note in beats
    if (songPositionInBeats + this.speed > currentNoteInBeats) {
      const { end, position, start } = currentNote;
      const note = new Note(this.column, position, start, end).initialize();

      this.notes.push(note);
      this.column.container.addChild(note.sprite);

      staff.proceed();
    }
  }
}

export default NoteField;
