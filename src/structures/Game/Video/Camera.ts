import { PerspectiveCamera } from "three";

import Game from "@/structures/Game";

class Camera extends PerspectiveCamera {
  private _game: Game;

  public constructor(
    game: Game,
    options: {
      fov?: number,
      aspect?: number,
      near?: number,
      far?: number
    }
  ) {
    super(options.fov, options.aspect, options.near, options.far);
    this._game = game;
  }

  public get game() {
    return this._game;
  }

  public initialize() {
    this.position.set(0, 20, 200);
    this.lookAt(this.game.video.scene.position);

    this.updateProjectionMatrix();
  }
}

export default Camera;
