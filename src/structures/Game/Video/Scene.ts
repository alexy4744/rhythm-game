import { DirectionalLight, HemisphereLight } from "three";
import { Scene as THREEScene } from "three";

import Game from "@/structures/Game";

import FretBoard from "@/structures/Game/Video/Scene/Objects/FretBoard";
import StrumBar from "@/structures/Game/Video/Scene/Objects/StrumBar";

class Scene extends THREEScene {
  private _fretBoard = new FretBoard(this.game);
  private _strumBar = new StrumBar(this.game);

  public constructor(private _game: Game) {
    super();
  }

  public get fretboard() {
    return this._fretBoard;
  }

  public get strumBar() {
    return this._strumBar;
  }

  public get game() {
    return this._game;
  }

  public initialize() {
    this.add(this.game.video.camera);
    this.add(this.fretboard.mesh);
    this.add(this.strumBar.mesh);
    
    this._setupLighting();
  }

  public update() {
    this.fretboard.update();
    this.strumBar.update();
  }

  private _setupLighting() {
    const hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, .9)
    const shadowLight = new DirectionalLight(0xffffff, .9);

    shadowLight.position.set(150, 350, 350);

    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    this.add(hemisphereLight);
    this.add(shadowLight);
  }
}

export default Scene;
