import { IcosahedronGeometry, Mesh, MeshPhongMaterial } from "three";

import AUDIO_MANAGER from "@/constants/audio_manager";

import Game from "@/structures/Game";

import SceneObject from "@/structures/Game/Video/Scene/SceneObject";

import FretBoard from "@/structures/Game/Video/Scene/Objects/FretBoard";
import StrumBar from "@/structures/Game/Video/Scene/Objects/StrumBar";

class FallingNote implements SceneObject {
  public static readonly RADIUS = 5;

  private _geometry = new IcosahedronGeometry(FallingNote.RADIUS);
  private _material = new MeshPhongMaterial({ color: 0x5089db });
  private _mesh = new Mesh(this.geometry, this.material);

  public constructor(private _game: Game, private _column: number) {
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.position.x = StrumBar.columnToXPosition(this.column) * StrumBar.COLUMN_SPACING;
    this.mesh.position.y = FallingNote.RADIUS * 2;
    this.mesh.position.z = -((FretBoard.DEPTH / 2) - FallingNote.RADIUS);
  }

  public get column() {
    return this._column;
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
    this.mesh.rotation.x += 0.015;
    this.mesh.rotation.y += 0.015;

    this._updatePosition();
  }

  private _updatePosition() {
    const { audioManager, staff } = this.game;

    const mp3 = audioManager.entries.get(AUDIO_MANAGER.BEATMAP_MP3);
    if (!mp3) return;

    const currentNotePositionInBeats = staff.currentNote.start / staff.secondsPerBeat;
    const currentSongPositionInBeats = mp3.currentPosition / staff.secondsPerBeat;

  }
}

export default FallingNote;
