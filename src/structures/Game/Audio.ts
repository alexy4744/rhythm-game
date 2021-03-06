import EventEmitter from "events";
import sound from "pixi-sound";

import Game from "@/structures/Game";

type Sound = {
  instance?: sound.IMediaInstance,
  sound?: sound.Sound
};

class Audio extends EventEmitter {
  private _countdown = 0;

  public constructor(private _game: Game) {
    super();
  }

  public get countdown() {
    return this._countdown;
  }

  public get game() {
    return this._game;
  }

  public add(id: number, options: sound.Options = {}): Promise<Sound> {
    return new Promise((resolve, reject) => {
      sound.add(String(id), {
        complete: (sound) => this.emit("complete", id, sound),
        loaded: (error, sound, instance) => {
          if (error) reject(error);
          else resolve({ instance, sound });
        },
        ...options
      });
    });
  }

  public find(id: number) {
    return sound.find(String(id));
  }

  public getTrackPosition(id: number, instanceId: number = 0) {
    const track = sound.find(String(id));
    if (!track) return 0;

    const instance = track.instances[instanceId];
    if (!instance) return 0;

    return (instance.progress * track.duration);
  }

  public play() {

  }

  public setCountdown(countdown: number) {
    this._countdown = countdown;
  }
}

export default Audio;
