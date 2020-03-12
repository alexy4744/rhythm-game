import { IcosahedronGeometry, Mesh, MeshPhongMaterial } from "three";

import Game from "@/structures/Game";

import SceneObject from "@/structures/Game/Video/Scene/SceneObject";

class Arrow implements SceneObject {
  private _geometry = new IcosahedronGeometry();
  private _material = new MeshPhongMaterial({ color: 0xffffff });
  private _mesh = new Mesh(this.geometry, this.material);

  public constructor(private _game: Game) {
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  public get game() {
    return this._game;
  }

  public get geometry() {
    return this._geometry;
  }

  public get material() {
    return this._material;
  }

  public get mesh() {
    return this._mesh;
  }

  public update() {
    
  }
}

export default Arrow;
