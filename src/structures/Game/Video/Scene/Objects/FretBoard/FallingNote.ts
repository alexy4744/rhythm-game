// Constructs a falling mesh on the fret board

import { IcosahedronGeometry, Mesh, MeshPhongMaterial } from "three";

class FallingNote {
  private _geometry = new IcosahedronGeometry();
  private _material = new MeshPhongMaterial({ color: this.color });
  private _mesh = new Mesh(this.geometry, this.material);

  public constructor(private _color: number) {
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  public get color() {
    return this._color;
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

export default FallingNote;
