import * as PIXI from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Column from "@/structures/Game/UI/Column";
import Component from "@/structures/Game/UI/Column/Component";
import Note from "@/structures/Game/UI/Column/Components/NoteField/Note";

import isEven from "@/utils/isEven";

class NoteField extends Component {
  public static readonly BEATS_SHOWN_IN_ADVANCE = 3;
  public static readonly HEIGHT = 650;
  public static readonly Y = 0;

  private _notes: Note[] = [];

  public get notes() {
    return this._notes;
  }

  public initialize() {
    super.initialize();

    this.sprite.alpha = isEven(this.column.index) ? 0.05 : 0.25;
    this.sprite.height = NoteField.HEIGHT;
    this.sprite.texture = PIXI.Texture.WHITE;
    this.sprite.y = NoteField.Y;

    return this;
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
    if (songPositionInBeats + NoteField.BEATS_SHOWN_IN_ADVANCE > currentNoteInBeats) {
      const { end, position, start } = currentNote;
      const note = new Note(this.column, position, start, end).initialize();

      this.notes.push(note);
      this.column.container.addChild(note.sprite);

      staff.proceed();
    }
  }
}

export default NoteField;
