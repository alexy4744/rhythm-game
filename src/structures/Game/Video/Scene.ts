import { Scene as THREEScene } from "three";
import { AmbientLight, PointLight, Vector3 } from "three";

import Video from "@/structures/Game/Video";

import FretBoard from "@/structures/Game/Video/Scene/Objects/FretBoard";
import StrumBar from "@/structures/Game/Video/Scene/Objects/StrumBar";

class Scene extends THREEScene {
  private _fretBoard = new FretBoard();
  private _strumBar = new StrumBar();

  public constructor(private _video: Video) {
    super();
    this.add(this.video.camera);

    this.add(this.fretboard.mesh);
    this.add(this.strumBar.mesh);

    this.add(new AmbientLight(0xffffff, 1));

    const light = new PointLight(0xffffff, 1.5, 18);

    light.position.set(-3, 15, -3);
    light.castShadow = true;

    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    this.add(light);

    this.video.camera.position.set(0, 10, 0);
    this.video.camera.lookAt(new Vector3(0, 3, 0));
    this.video.camera.updateProjectionMatrix();
  }

  public get fretboard() {
    return this._fretBoard;
  }

  public get video() {
    return this._video;
  }

  public get strumBar() {
    return this._strumBar;
  }
}

export default Scene;
