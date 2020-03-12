import Game from "@/structures/Game";

import Camera from "@/structures/Game/Video/Camera";
import Renderer from "@/structures/Game/Video/Renderer";
import Scene from "@/structures/Game/Video/Scene";

class Video {
  private _camera = new Camera(this.game, {
    aspect: window.innerWidth / window.innerHeight,
    far: 1000,
    fov: 75,
    near: 1
  });

  private _renderer = new Renderer({
    alpha: true,
    antialias: true
  });

  private _scene = new Scene(this.game);

  public constructor(private _game: Game) {
    window.addEventListener("resize", () => this._resize());
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

  public initialize() {
    this.camera.initialize();
    this.scene.initialize();
  }

  public update() {
    this.scene.update();
    this.renderer.render(this.scene, this.camera);
  }

  private _resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export default Video;
