import { Application } from "pixi.js";

import AudioAliases from "@/constants/AudioAliases";

import Beatmap from "@/structures/Beatmap";

import Audio from "@/structures/Game/Audio";
import Input from "@/structures/Game/Input";
import UI from "@/structures/Game/UI";

class Game extends Application {
  private _audio = new Audio(this);
  private _input = new Input(this);
  private _ui = new UI(this);

  public constructor(private _beatmap: Beatmap, options = {}) {
    super(options);
    document.body.appendChild(this.view);
  }

  public get audio() {
    return this._audio;
  }

  public get beatmap() {
    return this._beatmap;
  }

  public get input() {
    return this._input;
  }

  public get ui() {
    return this._ui;
  }

  public static async start(beatmap: Beatmap, options = {}) {
    const game = new Game(beatmap, options);

    await game.input.keybinds.load();

    const track = await game.audio.add(AudioAliases.BeatmapTrack, {
      autoPlay: false,
      preload: true,
      singleInstance: true,
      url: beatmap.metadata.mp3
    });

    if (!track.sound) throw new Error("Could not load track sound!");

    track.sound.play({
      start: 0
    });
  }
}

export default Game;
