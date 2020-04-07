import { Texture } from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Component from "@/structures/Game/UI/Lane/Component";

import Note from "@/structures/Game/UI/Lane/Components/NoteField/Note";
import HoldNote from "@/structures/Game/UI/Lane/Components/NoteField/HoldNote";
import SingleNote from "@/structures/Game/UI/Lane/Components/NoteField/SingleNote";

import isEven from "@/utils/isEven";

// Note queue
// current note = ...
// upcoming =  [...]
//

class NoteField extends Component {
  public static readonly HEIGHT = window.innerHeight - 128;
  public static readonly Y = 0;

  private _currentNote: Note | null = null;
  private _notes: Note[] = []

  private _speed: number = this.game.beatmap.bps;

  public get currentNote() {
    return this._currentNote;
  }

  public get notes() {
    return this._notes;
  }

  public get speed() {
    return this._speed;
  }

  public set speed(speed: number) {
    if (speed < 1) throw new RangeError("NoteField speed cannot be less than 1!");
    this._speed = speed;
  }

  public initialize() {
    super.initialize();

    this.sprite.alpha = isEven(this.lane.index) ? 0.05 : 0.25;
    this.sprite.height = NoteField.HEIGHT;
    this.sprite.texture = Texture.WHITE;
    this.sprite.y = NoteField.Y;

    return this;
  }

  public update() {
    this._spawnNotes();

    this.notes.forEach(note => note.update());
  }

  private _spawnNotes() {
    const songPosition = this.game.audio.getTrackPosition(AudioAliases.BeatmapTrack, 0);
    if (!songPosition) return;

    const { beatmap } = this.game;
    const { currentNote } = beatmap;

    // If the current note is not for this lane
    if (!currentNote || currentNote.laneIndex !== this.lane.index) return;

    const songPositionInBeats = songPosition / beatmap.crotchet;
    const currentNoteInBeats = currentNote.start / beatmap.crotchet;

    // song position in beats + number of beats ahead > current note in beats
    if (songPositionInBeats + this.speed > currentNoteInBeats) {
      const { end, start } = currentNote;

      const note = end && end > start ?
        new HoldNote(this.lane, start, end).initialize() :
        new SingleNote(this.lane, start).initialize();

      this.notes.push(note);

      this.lane.container.addChild(
        note instanceof HoldNote ?
          note.container :
          note.sprite
      );

      this._currentNote = note;

      beatmap.proceed();
    }
  }
}

export default NoteField;
