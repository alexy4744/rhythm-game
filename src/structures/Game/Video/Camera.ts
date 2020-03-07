import { PerspectiveCamera } from "three";

class Camera extends PerspectiveCamera {
  public constructor(
    fov?: number,
    aspect?: number,
    near?: number,
    far?: number
  ) {
    super(fov, aspect, near, far);
  }
}

export default Camera;
