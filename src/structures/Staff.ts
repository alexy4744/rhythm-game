// Keeps track of current and next note and holds all the notes from a beatmap

import Note from "@/structures/Note";

class Staff {
  private _currentNoteIndex = 0;

  public constructor(
    private _bpm: number,
    private _notes: Note[] = []
  ) { }

  public get bpm() {
    return this._bpm;
  }

  public get currentNote() {
    return this.notes[this.currentNoteIndex];
  }

  public get currentNoteIndex() {
    return this._currentNoteIndex;
  }

  public get nextNote() {
    return this.notes[this.currentNoteIndex + 1];
  }

  public get nextNoteIndex() {
    return this.currentNoteIndex + 1;
  }

  public get notes() {
    return this._notes;
  }

  public get secondsPerBeat() {
    return 60 / this.bpm;
  }

  public addNote(note: Note) {
    return this.notes.push(note);
  }

  public addNotes(notes: Note[]) {
    return this.notes.push(...notes)
  }

  public proceed(index = this.currentNoteIndex) {
    if (index >= this.notes.length) return;
    this._currentNoteIndex += 1;
  }

  public removeNote(noteIndex: number) {
    return this.notes.splice(noteIndex, 1);
  }
}

export default Staff;