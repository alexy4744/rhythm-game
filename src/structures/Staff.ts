import NoteType from "@/types/Beatmap/Note";

class Staff {
  private _currentBeatIndex = 0;
  private _lastBeat = 0; // Time since last beat

  public constructor(
    private _bpm: number,
    private _notes: NoteType[]
  ) { }

  public get bpm() {
    return this._bpm;
  }

  public get bps() {
    return this.bpm / 60;
  }

  public get crotchet() {
    return 60 / this.bpm;
  }

  public get currentNote() {
    return this.notes[this._currentBeatIndex];
  }

  public get lastBeat() {
    return this._lastBeat;
  }

  public get nextNote() {
    return this.notes[this._currentBeatIndex + 1];
  }

  public get notes() {
    return this._notes;
  }

  public proceed() {
    this._currentBeatIndex += 1;
    this._lastBeat += this.crotchet;
  }

  public setBPM(bpm: number) {
    if (bpm < 1) throw new Error("BPM cannot be less than 1!");

    this._bpm = bpm;
  }
}

export default Staff;
