import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

class StrumBar {
  private _geometry = new BoxGeometry(5, 0, 20, 0);
  private _material = new MeshPhongMaterial({ color: 0xffac32 });
  private _mesh = new Mesh(this.geometry, this.material);

  public constructor() {
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.position.set(40, 0, 0);
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

export default StrumBar;
