import Note from "@/types/Note";

type Beatmap = {
  metadata: {
    artist: string,
    beatmapper: string,
    bpm: number,
    mp3: string,
    title: string
  },
  notes: Note[],
  versioning: {
    beatmap: string,
    fileFormat: string
  }
};

export default Beatmap;
