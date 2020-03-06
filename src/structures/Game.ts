import AudioManager from "@/structures/Game/Audio/AudioManager";
import Note from "@/structures/Staff/Note";
import Staff from "@/structures/Staff";

import BeatmapType from "@/types/Beatmap";
import Audio from "./Game/Audio/Audio";

let counter = 1;

class Game {
  // Flag to make sure that the class was instantiated using the
  // static create() method instead of invoking constructor directly
  private static _created = false;

  public constructor(
    private _audioManager: AudioManager,
    private _staff: Staff
  ) {
    if (!Game.created) throw new Error("Game was not instantiated using the create method!");

    // Kick start the game loop
    requestAnimationFrame(() => this._update());
  }

  public get audioManager() {
    return this._audioManager;
  }

  public static get created() {
    return Game._created;
  }

  public get staff() {
    return this._staff;
  }

  public static async create(beatmap: BeatmapType) {
    Game._created = true;

    const audioManager = new AudioManager();
    const staff = new Staff(beatmap.metadata.bpm);
    const game = new Game(audioManager, staff);

    await audioManager.add("BEATMAP_MP3", beatmap.metadata.mp3);

    staff.addNotes(beatmap.notes.map(note => new Note(game, note.key, note.start, note.end)))
    audioManager.entries.get("BEATMAP_MP3")?.play();

    return game;
  }

  // The game loop
  private _update() {
    const { staff } = this;
    console.log(staff)
    if (staff.currentNoteIndex >= staff.notes.length) return;
    const mp3 = this.audioManager.entries.get("BEATMAP_MP3") as Audio;

    if (staff.currentNote.start / staff.secondsPerBeat < mp3.currentPosition / staff.secondsPerBeat) {
      console.log(mp3.currentPosition, mp3.currentPosition / staff.secondsPerBeat);
      staff.playNote(staff.currentNoteIndex);
      counter += 1;
      document.body.innerHTML += counter;
    }

    requestAnimationFrame(() => this._update());
  }
}

export default Game;
