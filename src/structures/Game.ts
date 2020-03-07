import AudioManager from "@/structures/Game/AudioManager";
import InputHandler from "@/structures/Game/InputHandler";
import Video from "@/structures/Game/Video";

import Note from "@/structures/Note";
import Staff from "@/structures/Staff";

import BeatmapType from "@/types/Beatmap";

import FLAGS from "@/constants/flags";

class Game {
  private _audioManager = new AudioManager(this);
  private _inputHandler = new InputHandler(this);
  private _video = new Video(this);

  public constructor(private _staff: Staff) { }

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
    const staff = new Staff(
      beatmap.metadata.bpm,
      beatmap.notes.map(note => new Note(note.key, note.start, note.end))
    );

    const game = new Game(staff);

    await game.audioManager.add(FLAGS.AUDIO.BEATMAP_MP3, beatmap.metadata.mp3);

    return game;
  }

  // Kick start the game loop
  public start() {
    const mp3 = this.audioManager.entries.get(FLAGS.AUDIO.BEATMAP_MP3);
    if (!mp3) throw new Error("Beatmap MP3 is not found in audio manager!");

    requestAnimationFrame(() => {
      mp3.play();
      this._update();
    });
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
