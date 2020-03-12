import Game from "@/structures/Game";

class InputHandler {
  public constructor(private _game: Game) {}

  public get game() {
    return this._game;
  }

  public initialize() {}
}

export default InputHandler;
