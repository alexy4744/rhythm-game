import { Audio as THREEAudio, AudioListener } from "three";

class Audio extends THREEAudio {
  private _lastPosition: number = 0;

  public constructor(listener: AudioListener) {
    super(listener);
    this.onEnded = () => this.stop();
  }

  public get currentPosition() {
    if (!this.isPlaying) return 0;

    return (this.context.currentTime - this._lastPosition) * this.getPlaybackRate() - this.offset;
  }

  public play() {
    this._lastPosition = this.context.currentTime;

    return super.play();
  }

  public stop() {
    this._lastPosition = 0;

    return super.stop();
  }
}

export default Audio;
