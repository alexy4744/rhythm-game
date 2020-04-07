import Game from "@/structures/Game";

import Keybinds from "@/structures/Game/Input/Keybinds";

class Input {
  public static readonly VALID_MODES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  private _keybinds = new Keybinds(this);

  public constructor(
    private _game: Game,
    private _mode = 4
  ) { }

  public get game() {
    return this._game;
  }

  public get keybinds() {
    return this._keybinds;
  }

  public get mode() {
    return this._mode;
  }

  public set mode(mode: number) {
    if (!Input.VALID_MODES.includes(mode)) {
      throw new RangeError(`Invalid input mode "${mode}"!`);
    }

    this._mode = mode;
  }
}

export default Input;
