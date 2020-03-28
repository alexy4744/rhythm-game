import * as PIXI from "pixi.js";

import Component from "@/structures/Game/UI/Column/Component";
import NoteField from "@/structures/Game/UI/Column/Components/NoteField";

class HitArea extends Component {
  public static readonly HEIGHT = 16;
  public static readonly Y = NoteField.HEIGHT;

  public initialize() {
    super.initialize();

    this.sprite.alpha = 0.3;
    this.sprite.height = HitArea.HEIGHT;
    this.sprite.texture = PIXI.Texture.WHITE;
    this.sprite.y = HitArea.Y;

    return this;
  }

  public update() { }
}

export default HitArea;
