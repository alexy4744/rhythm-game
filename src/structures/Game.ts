import { Clock } from "three";

import AUDIO_MANAGER from "@/constants/audio_manager";

import AudioManager from "@/structures/Game/AudioManager";
import InputHandler from "@/structures/Game/InputHandler";
import Video from "@/structures/Game/Video";

import Note from "@/structures/Note";
import Staff from "@/structures/Staff";

import BeatmapType from "@/types/Beatmap";

class Game {
  private _clock = new Clock(false);

  private _audioManager = new AudioManager(this);
  private _inputHandler = new InputHandler(this);
  private _video = new Video(this);

  public constructor(private _staff: Staff) { }

  public get audioManager() {
    return this._audioManager;
  }

  public get clock() {
    return this._clock;
  }

  public get inputHandler() {
    return this._inputHandler;
  }

  public get paused() {
    return !this.clock.running;
  }

  public get staff() {
    return this._staff;
  }

  public get video() {
    return this._video;
  }

  public static async create(beatmap: BeatmapType) {
    const staff = new Staff(
      beatmap.metadata.bpm,
      beatmap.notes.map(note => new Note(note.column, note.start, note.end))
    );

    const game = new Game(staff)._initialize();

    await game.audioManager.add(AUDIO_MANAGER.BEATMAP_MP3, beatmap.metadata.mp3);

    return game;
  }

  public start() {
    this.clock.start();

    requestAnimationFrame(() => this._update());
  }

  private _initialize() {
    this.video.initialize();

    return this;
  }

  private _update() {
    if (!this.paused) {
      this.audioManager.update();
      this.video.update();
    }

    requestAnimationFrame(() => this._update());
  }
}

export default Game;
