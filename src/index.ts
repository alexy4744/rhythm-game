import Game from "@/structures/Game";

import "@/assets/scss/main.scss";

const beatmap = {
  "metadata": {
    "artist": "Test",
    "beatmapper": "Me",
    "bpm": 146,
    "mp3": "/flag.mp3",
    "title": "Test"
  },
  "notes": [
    // { "position": 1, "start": 0 },
    { "position": 0, "start": 6.5 },
    { "position": 1, "start": 9.8 },
    { "position": 2, "start": 13.1 },
    { "position": 3, "start": 16.4 },
    { "position": 4, "start": 26.3 },
    { "position": 0, "start": 29.5 },
    { "position": 1, "start": 32.8 },
    { "position": 2, "start": 36.1 },
    { "position": 3, "start": 39.4 },
    { "position": 4, "start": 42.7 },
    { "position": 0, "start": 44.1 },
    { "position": 1, "start": 46 },
    { "position": 2, "start": 49.3 },
    { "position": 3, "start": 52.6 }
  ],
  "versioning": {
    "beatmap": "1.0.0",
    "fileFormat": "1.0.0"
  }
};

Game.start(beatmap, {
  height: window.innerHeight,
  width: window.innerWidth
});
