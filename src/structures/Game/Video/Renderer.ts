import { PCFShadowMap, WebGLRenderer, WebGLRendererParameters } from "three";

class Renderer extends WebGLRenderer {
  public constructor(parameters?: WebGLRendererParameters) {
    super(parameters);
    this.setSize(window.innerWidth, window.innerHeight);

    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFShadowMap;

    document.body.appendChild(this.domElement);
  }
}

export default Renderer;
