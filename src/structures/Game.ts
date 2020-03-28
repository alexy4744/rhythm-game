import { Application } from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Staff from "@/structures/Staff";

import Audio from "@/structures/Game/Audio";
import Input from "@/structures/Game/Input";
import UI from "@/structures/Game/UI";

import BeatmapType from "@/types/Beatmap";

class Game extends Application {
  private _audio = new Audio(this);
  private _input = new Input(this);
  private _ui = new UI(this);

  public constructor(
    private _staff: Staff,
    options = {}
  ) {
    super(options);
    document.body.appendChild(this.view);
  }

  public get audio() {
    return this._audio;
  }

  public get input() {
    return this._input;
  }

  public get staff() {
    return this._staff;
  }

  public get ui() {
    return this._ui;
  }

  public static async start(beatmap: BeatmapType, options = {}) {
    const staff = new Staff(beatmap.metadata.bpm, beatmap.notes);
    const game = new Game(staff, options);

    const track = await game.audio.add(AudioAliases.BeatmapTrack, {
      autoPlay: false,
      preload: true,
      singleInstance: true,
      url: beatmap.metadata.mp3
    });

    if (!track.sound) throw new Error("Could not load track sound!");

    track.sound.play();
  }
}

export default Game;
