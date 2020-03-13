import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

import Game from "@/structures/Game";

import SceneObject from "@/structures/Game/Video/Scene/SceneObject";

import StrumBar from "@/structures/Game/Video/Scene/Objects/StrumBar";

class StationaryNote implements SceneObject {
  public static readonly HEIGHT = 2.5;
  public static readonly WIDTH = 5;

  private _geometry = new BoxGeometry(StationaryNote.WIDTH, StationaryNote.HEIGHT, StationaryNote.WIDTH);
  private _material = new MeshPhongMaterial({ color: 0x5089db * this.column });
  private _mesh = new Mesh(this.geometry, this.material);

  public constructor(
    private _game: Game,
    private _column: number
  ) {
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.position.x = this.column * StrumBar.COLUMN_SPACING;
    this.mesh.position.y = StationaryNote.HEIGHT / 2;
  }

  public get column() {
    return this._column;
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

export default StationaryNote;
