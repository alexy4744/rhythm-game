import { Sprite, Texture } from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Component from "@/structures/Game/UI/Lane/Component";

import HitArea from "@/structures/Game/UI/Lane/Components/HitArea";
import Note from "@/structures/Game/UI/Lane/Components/NoteField/Note";

import lerp from "@/utils/lerp";
import NoteField from "../NoteField";

class SingleNote extends Note {
  private _destroyed = false;

  private _sprite = new Sprite();

  public get destroyed() {
    return this._destroyed;
  }

  public get judgeable() {
    return !this.destroyed &&
      this.sprite.y >= NoteField.HEIGHT - HitArea.HEIGHT && /* Right above hit area */
      this.sprite.y <= NoteField.HEIGHT + HitArea.HEIGHT; /* Right below hit area */
  }

  public get sprite() {
    return this._sprite;
  }

  public destroy() {
    if (this.destroyed) return;

    this._destroyed = true;
    this.sprite.destroy();
  }

  public hit() {
    if (this.destroyed || !this.judgeable) return null;

    const songPosition = this.game.audio.getTrackPosition(AudioAliases.BeatmapTrack, 0);
    if (!songPosition) return null;

    this.destroy();;
    console.log("hit", this.start)

    return songPosition;
  }

  public initialize() {
    this.sprite.alpha = 0.75;
    this.sprite.height = HitArea.HEIGHT;
    this.sprite.texture = Texture.WHITE;
    this.sprite.width = Component.WIDTH;
    this.sprite.x = this.lane.index * this.sprite.width;

    return this;
  }

  public update() {
    if (this.destroyed) return;

    const songPosition = this.game.audio.getTrackPosition(AudioAliases.BeatmapTrack, 0);
    if (!songPosition) return;
    // if (songPosition > this.start) return;
    // if (songPosition > this.start) return this.destroy();
    // if (this.sprite.y > NoteField.HEIGHT + (HitArea.HEIGHT)) return this.destroy();

    const { crotchet } = this.game.beatmap;

    const songPositionInBeats = songPosition / crotchet;
    const currentNoteInBeats = this.start / crotchet;

    const progress = 1 - (currentNoteInBeats - songPositionInBeats) / this.lane.noteField.speed;
    this.sprite.y = lerp(-(HitArea.HEIGHT * 2), HitArea.Y, progress);
  }
}

export default SingleNote;
