import AudioAliases from "@/constants/AudioAliases";

import Input from "@/structures/Game/Input";

class Keybinds {
  private _binds: { [key: string]: number } = {};
  private _states = new Map<string, boolean>();

  public constructor(private _input: Input) {
    window.addEventListener("keydown", ({ keyCode }) => {
      if (this._isValidKey(keyCode)) this._keydown(String(keyCode));
    });

    window.addEventListener("keyup", ({ keyCode }) => {
      if (this._isValidKey(keyCode)) this._keyup(String(keyCode));
    });
  }

  public get binds() {
    return this._binds;
  }

  public get input() {
    return this._input;
  }

  public get states() {
    return this._states;
  }

  public async load(mode?: number) {
    if (mode) this.input.mode = mode;

    const { default: keybinds } = await import(`@/structures/Game/Input/Keybinds/${this.input.mode}KMode`);

    this._binds = keybinds;
    this._states.clear();

    Object
      .keys(keybinds)
      .forEach(keyCode => this.states.set(keyCode, false));
  }

  private _isValidKey(keyCode: number | string) {
    return Object
      .keys(this.binds)
      .includes(
        typeof keyCode === "number" ?
          String(keyCode) :
          keyCode
      );
  }

  private _keydown(keyCode: string) {
    if (this.states.get(keyCode)) return;
    this.states.set(keyCode, true);

    const now = this.input.game.audio.getTrackPosition(AudioAliases.BeatmapTrack);
    const lane = this.input.game.ui.lanes[this.binds[keyCode]];
    const currentNote = lane.noteField.currentNote;
    if (!currentNote?.judgeable) return;

    // console.log(lane.noteField.currentNote)
    if (!currentNote.destroyed) currentNote.hit();
  }

  private _keyup(keyCode: string) {
    if (!this.states.get(keyCode)) return;
    this.states.set(keyCode, false);;
  }
}

export default Keybinds;
