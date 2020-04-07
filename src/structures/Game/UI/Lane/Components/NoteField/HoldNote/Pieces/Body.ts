import AudioAliases from "@/constants/AudioAliases";

import Component from "@/structures/Game/UI/Lane/Component";

import Piece from "@/structures/Game/UI/Lane/Components/NoteField/HoldNote/Piece";

class Body extends Piece {
  public initialize() {
    super.initialize();

    const { crotchet } = this.game.beatmap;

    const songPosition = this.game.audio.getTrackPosition(AudioAliases.BeatmapTrack, 0);
    const songPositionInBeats = songPosition / crotchet;

    const endInBeats = this.holdNote.end / crotchet;
    const progress = 1 - (endInBeats - songPositionInBeats) / this.lane.noteField.speed;
    const height = progress * this.lane.noteField.sprite.height;

    this.sprite.height = height;
    this.sprite.width = Component.WIDTH / 1.5;
    this.sprite.x = (this.lane.index * Component.WIDTH) + ((this.sprite.width / 2) / 2);

    return this;
  }
}

export default Body;
