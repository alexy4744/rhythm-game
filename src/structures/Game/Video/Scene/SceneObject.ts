import { Geometry, Material, Mesh } from "three";

import Game from "@/structures/Game";

abstract class SceneObject {
  public abstract get game(): Game
  public abstract get geometry(): Geometry;
  public abstract get material(): Material;
  public abstract get mesh(): Mesh;

  public abstract update(): void;
}

export default SceneObject;
