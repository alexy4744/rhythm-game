import AudioManager from "@/structures/Game/AudioManager";
import InputHandler from "@/structures/Game/InputHandler";
import Video from "@/structures/Game/Video";

import Note from "@/structures/Note";
import Staff from "@/structures/Staff";

import BeatmapType from "@/types/Beatmap";

import FLAGS from "@/constants/flags";

class Game {
  // Flag to make sure that the class was instantiated using the
  // static create() method instead of invoking constructor directly
  private static _created = false;

  public constructor(
    private _audioManager: AudioManager,
    private _inputHandler: InputHandler,
    private _video: Video,
    private _staff: Staff
  ) {
    if (!Game.created) throw new Error("Game was not instantiated using the create method!");

    // Kick start the game loop
    requestAnimationFrame(() => this._update());
  }

  public static get created() {
    return Game._created;
  }

  public get audioManager() {
    return this._audioManager;
  }

  public get inputHandler() {
    return this._inputHandler;
  }

  public get staff() {
    return this._staff;
  }

  public get video() {
    return this._video;
  }

  public static async create(beatmap: BeatmapType) {
    Game._created = true;

    const staff = new Staff(beatmap.metadata.bpm);

    const audioManager = new AudioManager(staff);
    const inputHandler = new InputHandler(staff);
    const video = new Video(staff);

    const game = new Game(audioManager, inputHandler, video, staff);

    await audioManager.add(FLAGS.AUDIO.BEATMAP_MP3, beatmap.metadata.mp3);

    staff.addNotes(beatmap.notes.map(note => new Note(note.key, note.start, note.end)));
    audioManager.entries.get(FLAGS.AUDIO.BEATMAP_MP3)?.play();

    return game;
  }

  // The game loop
  private _update() {
    requestAnimationFrame(() => this._update());

    this.video.render();

    if (this.staff.currentNoteIndex >= this.staff.notes.length) return;

    const mp3 = this.audioManager.entries.get(FLAGS.AUDIO.BEATMAP_MP3);
    if (!mp3) throw new Error("Beatmap music file not loaded in audio manager!");

    const currentNotePositionInBeats = this.staff.currentNote.start / this.staff.secondsPerBeat;
    const currentSongPositionInBeats = mp3.currentPosition / this.staff.secondsPerBeat;

    if (currentNotePositionInBeats < currentSongPositionInBeats) {
      console.log(mp3.currentPosition, currentSongPositionInBeats, currentNotePositionInBeats);
      this.staff.proceed();
    }
  }
}

export default Game;
