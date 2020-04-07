import NoteType from "@/types/Note";

class Beatmap {
  private _currentBeatIndex = 0;

  public constructor(
    private _metadata: {
      artist: string,
      beatmapper: string,
      bpm: number,
      lanes: number,
      mp3: string,
      title: string
    },
    private _notes: NoteType[]
  ) { }

  public get bpm() {
    return this.metadata.bpm;
  }

  public set bpm(bpm: number) {
    if (bpm < 1) throw new Error("BPM cannot be less than 1!");
    this._metadata.bpm = bpm;
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

  public get metadata() {
    return this._metadata;
  }

  public get nextNote() {
    return this.notes[this._currentBeatIndex + 1];
  }

  public get notes() {
    return this._notes;
  }

  public proceed() {
    this._currentBeatIndex += 1;
  }
}

export default Beatmap;
