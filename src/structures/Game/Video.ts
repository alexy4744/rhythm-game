import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Game from "@/structures/Game";

import Camera from "@/structures/Game/Video/Camera";
import Renderer from "@/structures/Game/Video/Renderer";
import Scene from "@/structures/Game/Video/Scene";

class Video {
  private _camera = new Camera(50, window.innerWidth / window.innerHeight, 1, 1000);
  private _renderer = new Renderer({ antialias: true });
  private _scene = new Scene(this);

  public constructor(private _game: Game) {
    window.addEventListener("resize", () => this._resize());

    new OrbitControls(this.camera, this.renderer.domElement);
  }

  public get camera() {
    return this._camera;
  }

  public get game() {
    return this._game;
  }

  public get renderer() {
    return this._renderer;
  }

  public get scene() {
    return this._scene;
  }

  public render() {
    return this.renderer.render(this.scene, this.camera);
  }

  public update() {

  }

  private _resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export default Video;
