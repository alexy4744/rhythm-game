import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

class FretBoard {
  public static readonly BEATS_SHOWN_IN_ADVANCE = 3;

  private _geometry = new BoxGeometry(75, 0, 20, 0);
  private _material = new MeshPhongMaterial({ color: 0xde2e43 });
  private _mesh = new Mesh(this.geometry, this.material);

  public constructor() {
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
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
}

export default FretBoard;
