import Lane from "@/structures/Game/UI/Lane";

abstract class Note {
  public constructor(
    private _lane: Lane,
    private _start: number,
  ) {}

  public abstract get destroyed(): boolean;
  public abstract get judgeable(): boolean;

  public get game() {
    return this.lane.game;
  }

  public get lane() {
    return this._lane;
  }

  public get start() {
    return this._start;
  }

  public abstract destroy(): void;
  public abstract hit(): void;
  public abstract initialize(): void;
  public abstract update(): void;
}

export default Note;
