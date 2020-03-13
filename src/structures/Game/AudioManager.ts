import { AudioListener, AudioLoader } from "three";

import AUDIO_MANAGER from "@/constants/audio_manager";

import Game from "@/structures/Game";

import Audio from "@/structures/Game/AudioManager/Audio";

type AddOptions = {
  progress?: ProgressCallback,
  shouldReplace?: boolean
}

type ProgressCallback = (request: ProgressEvent<EventTarget>) => void;

class AudioManager {
  private _entries = new Map<String, Audio>();
  private _loader = new AudioLoader();

  public constructor(private _game: Game) { }

  public get entries() {
    return this._entries;
  }

  public get game() {
    return this._game;
  }

  public async add(name: string, url: string, options: AddOptions = {}) {
    if (!options.shouldReplace && this.entries.has(name)) {
      throw new Error(`Audio with name "${name}" already exists!`);
    }

    const buffer = await this._loadAudioAsync(url, options.progress);
    const audio = new Audio(new AudioListener()).setBuffer(buffer);

    this.entries.set(name, audio);

    return audio;
  }

  public update() {
    const mp3 = this.entries.get(AUDIO_MANAGER.BEATMAP_MP3);
    if (!mp3) throw new Error("Beatmap MP3 is not found in audio manager!");

    if (this.game.paused) mp3.pause();
    else if (!mp3.isPlaying) mp3.play();
  }

  private _loadAudioAsync(url: string, progress?: ProgressCallback) {
    return new Promise<AudioBuffer>((resolve, reject) => {
      this._loader.load(url, resolve, progress, reject)
    });
  }
}

export default AudioManager;
