import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

import Staff from "@/structures/Staff";

class Video {
  private _camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  private _renderer = new WebGLRenderer();
  private _scene = new Scene();

  public constructor(private _staff: Staff) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.camera);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => this._resize());
  }

  public get camera() {
    return this._camera;
  }

  public get renderer() {
    return this._renderer;
  }

  public get scene() {
    return this._scene;
  }

  public get staff() {
    return this._staff;
  }

  public render() {
    return this.renderer.render(this.scene, this.camera);
  }

  private _resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export default Video;
