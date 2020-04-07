import Component from "@/structures/Game/UI/Lane/Component";

import HitArea from "@/structures/Game/UI/Lane/Components/HitArea";
import Piece from "@/structures/Game/UI/Lane/Components/NoteField/HoldNote/Piece";

class Head extends Piece {
  public initialize() {
    super.initialize();

    this.sprite.height = HitArea.HEIGHT;
    this.sprite.width = Component.WIDTH;
    this.sprite.x = this.lane.index * this.sprite.width;
    this.sprite.y = (this.holdNote.body.sprite.y - this.holdNote.body.sprite.height) - HitArea.HEIGHT;

    return this;
  }
}

export default Head;
