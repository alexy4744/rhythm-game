import Game from "@/structures/Game";

class InputHandler {
  public constructor(private _game: Game) {}

  public get game() {
    return this._game;
  }
}

export default InputHandler;
