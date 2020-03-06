import Note from "@/structures/Staff/Note";

class Staff {
  private _currentNoteIndex = 0;
  private _notes: Note[] = []

  public constructor(
    private _bpm: number
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

  public playNote(index = this.currentNoteIndex) {
    if (index >= this.notes.length) return;

    this.notes[this.currentNoteIndex].play();
    this._currentNoteIndex += 1;
  }

  public removeNote(noteIndex: number) {
    return this.notes.splice(noteIndex, 1);
  }
}

export default Staff;