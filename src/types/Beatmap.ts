import NoteType from "@/types/Beatmap/Note";

type Beatmap = {
  metadata: {
    artist: string,
    beatmapper: string,
    bpm: number,
    keys: number,
    mp3: string,
    title: string
  },
  notes: NoteType[],
  versioning: {
    beatmap: string,
    fileFormat: string
  }
}

export default Beatmap;
