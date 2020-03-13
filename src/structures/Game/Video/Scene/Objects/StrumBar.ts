import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

import Game from "@/structures/Game";

import SceneObject from "@/structures/Game/Video/Scene/SceneObject";

import FretBoard from "@/structures/Game/Video/Scene/Objects/FretBoard";

import StationaryNote from "@/structures/Game/Video/Scene/Objects/StrumBar/StationaryNote";

class StrumBar implements SceneObject {
  public static readonly DEPTH = 15;
  public static readonly WIDTH = 50;

  public static readonly MAX_COLUMNS = 5; // Can only be odd
  public static readonly COLUMN_SPACING = StrumBar.WIDTH / StrumBar.MAX_COLUMNS;

  public static readonly FIRST_COLUMN_IDX = -Math.floor(StrumBar.MAX_COLUMNS / 2);
  public static readonly LAST_COLUMN_IDX = Math.floor(StrumBar.MAX_COLUMNS / 2);

  private _geometry = new BoxGeometry(StrumBar.WIDTH, 0, StrumBar.DEPTH, 0);
  private _material = new MeshPhongMaterial({ color: 0xffac32 });
  private _mesh = new Mesh(this.geometry, this.material);

  private _stationaryNotes: StationaryNote[] = [];

  public constructor(private _game: Game) {
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.mesh.position.z = FretBoard.DEPTH - (StrumBar.WIDTH - StrumBar.DEPTH);

    this._spawnStationaryNotes();
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

  public get stationaryNotes() {
    return this._stationaryNotes;
  }

  // Get x position from a column number
  // -2, -1, 0, 1, 2 => Actual x positions of columns excluding spacing
  // 1, 2, 3, 4, 5 => Column number of a note
  // columnToXPosition(2) => -1
  // columnToXPosition(4) => 1
  public static columnToXPosition(column: number) {
    let count = 0;
    
    for (let i = StrumBar.FIRST_COLUMN_IDX; i <= StrumBar.LAST_COLUMN_IDX; i += 1) {
      count += 1;
      if (count === column) return i;
    }

    throw new Error(`Column "${column}" is out of strum bar column boundaries`);
  }

  public update() {
  }

  private _spawnStationaryNotes() {
    for (let i = StrumBar.FIRST_COLUMN_IDX; i <= StrumBar.LAST_COLUMN_IDX; i += 1) {
      const stationaryNote = new StationaryNote(this.game, i);

      this.stationaryNotes.push(stationaryNote);
      this.mesh.add(stationaryNote.mesh);
    }
  }
}

export default StrumBar;
