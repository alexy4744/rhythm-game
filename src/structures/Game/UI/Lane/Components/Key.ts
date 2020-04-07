import { Texture } from "pixi.js";

import Component from "@/structures/Game/UI/Lane/Component";

import HitArea from "@/structures/Game/UI/Lane/Components/HitArea";
import NoteField from "@/structures/Game/UI/Lane/Components/NoteField";

class Key extends Component {
  public static readonly HEIGHT = 96;
  public static readonly Y = HitArea.HEIGHT + NoteField.HEIGHT;

  public initialize() {
    super.initialize();

    this.sprite.alpha = 0.5;
    this.sprite.height = Key.HEIGHT;
    this.sprite.texture = Texture.WHITE;
    this.sprite.y = Key.Y;

    return this;
  }

  public update() {
    
  }
}

export default Key;
