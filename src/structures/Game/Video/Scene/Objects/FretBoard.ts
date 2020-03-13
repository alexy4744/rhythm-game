import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

import AUDIO_MANAGER from "@/constants/audio_manager";

import Game from "@/structures/Game";

import SceneObject from "@/structures/Game/Video/Scene/SceneObject";

import FallingNote from "@/structures/Game/Video/Scene/Objects/FretBoard/FallingNote";

import StrumBar from "@/structures/Game/Video/Scene/Objects/StrumBar";

class FretBoard implements SceneObject {
  public static readonly BEATS_SHOWN_IN_ADVANCE = 0;

  public static readonly DEPTH = 200;
  public static readonly WIDTH = 50;

  private _fallingNotes: FallingNote[] = [];

  private _geometry = new BoxGeometry(FretBoard.WIDTH, 0, FretBoard.DEPTH, 0);
  private _material = new MeshPhongMaterial({ color: 0xde2e43 });
  private _mesh = new Mesh(this.geometry, this.material);

  public constructor(private _game: Game) {
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.position.z = StrumBar.WIDTH + (StrumBar.DEPTH / 2);
  }

  private get fallingNotes() {
    return this._fallingNotes;
  }

  public get game() {
    return this._game;
  }

  public get geometry() {
    return this._geometry;
  }

  public get material() {
    return this._material;
  }

  public get mesh() {
    return this._mesh;
  }

  public update() {
    this._spawnNote();

    this.fallingNotes.forEach(fallingNote => fallingNote.update());
  }

  private _spawnNote() {
    const { audioManager, staff } = this.game;
    if (!staff.nextNote) return;

    const mp3 = audioManager.entries.get(AUDIO_MANAGER.BEATMAP_MP3);
    if (!mp3) return;

    const currentNotePositionInBeats = staff.currentNote.start / staff.secondsPerBeat;
    const currentSongPositionInBeats = mp3.currentPosition / staff.secondsPerBeat;

    // if (currentNotePositionInBeats < currentSongPositionInBeats + 1) {
    //   console.log("EXACT", mp3.currentPosition, currentSongPositionInBeats, currentNotePositionInBeats)
    // }

    if (currentNotePositionInBeats < currentSongPositionInBeats + FretBoard.BEATS_SHOWN_IN_ADVANCE) {
      console.log("ADVANCED", mp3.currentPosition, currentSongPositionInBeats, currentNotePositionInBeats);

      const falling = new FallingNote(this.game, staff.currentNote.column);

      this.fallingNotes.push(falling);
      this.mesh.add(falling.mesh);

      staff.proceed();
    }
  }
}

export default FretBoard;
