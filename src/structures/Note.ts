import NoteType from "@/types/Note";

class Note implements NoteType {
  public constructor(
    private _key: number,
    private _start: number,
    // If the note should be held, end specifies when the note should be released
    private _end?: number
  ) { }

  public get end() {
    return this._end;
  }

  public get key() {
    return this._key;
  }

  public get start() {
    return this._start;
  }
}

export default Note;