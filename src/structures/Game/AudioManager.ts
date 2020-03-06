import { AudioListener, AudioLoader } from "three";

import Audio from "@/structures/Game/AudioManager/Audio";

import Staff from "@/structures/Staff";

class AudioManager {
  private _entries = new Map<String, Audio>();
  private _listener = new AudioListener();
  private _loader = new AudioLoader();

  public constructor(private _staff: Staff) {}

  public get entries() {
    return this._entries;
  }

  public get listener() {
    return this._listener;
  }

  public get staff() {
    return this._staff;
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

  private _loadAudioAsync(url: string, progress?: () => void) {
    return new Promise<AudioBuffer>((resolve, reject) => {
      this._loader.load(url, resolve, progress, reject)
    });
  }
}

export default AudioManager;
