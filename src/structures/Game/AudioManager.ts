import { AudioListener, AudioLoader } from "three";

import Game from "@/structures/Game";

import Audio from "@/structures/Game/AudioManager/Audio";

import FLAGS from "@/constants/flags";

class AudioManager {
  private _entries = new Map<String, Audio>();
  private _listener = new AudioListener();
  private _loader = new AudioLoader();

  public constructor(private _game: Game) { }

  public get entries() {
    return this._entries;
  }

  public get game() {
    return this._game;
  }

  public get listener() {
    return this._listener;
  }

  public async add(name: string, url: string, shouldReplace = false) {
    if (!shouldReplace && this.entries.has(name)) {
      throw new Error(`Audio with name "${name}" already exists!`);
    }

    const buffer = await this._loadAudioAsync(url);
    const audio = new Audio(this.listener).setBuffer(buffer);

    this.entries.set(name, audio);

    return audio;
  }

  public update() {
    const mp3 = this.entries.get(FLAGS.AUDIO.BEATMAP_MP3);
    if (!mp3) throw new Error("Beatmap MP3 is not found in audio manager!");

    if (this.game.paused) mp3.pause();
    else if (!mp3.isPlaying) mp3.play();
  }

  private _loadAudioAsync(url: string, progress?: () => void) {
    return new Promise<AudioBuffer>((resolve, reject) => {
      this._loader.load(url, resolve, progress, reject)
    });
  }
}

export default AudioManager;
