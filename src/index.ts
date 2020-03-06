import Game from "@/structures/Game";

document.querySelector("button")?.addEventListener("click", async () => {
  const game = await Game.create({
    "metadata": {
      "artist": "Test",
      "beatmapper": "Me",
      "bpm": 146,
      "mp3": "/flag.mp3",
      "title": "Test"
    },
    "notes": [
      { "key": 1, "start": 6.5 },
      { "key": 2, "start": 9.8 },
      { "key": 3, "start": 13.1 },
      { "key": 4, "start": 16.4 },
      { "key": 5, "start": 26.3 },
      { "key": 1, "start": 29.5 },
      { "key": 2, "start": 32.8 },
      { "key": 3, "start": 36.1 },
      { "key": 4, "start": 39.4 },
      { "key": 5, "start": 42.7 },
      { "key": 1, "start": 44.1 },
      { "key": 2, "start": 46 },
      { "key": 3, "start": 49.3 },
      { "key": 4, "start": 52.6 }
    ],
    "versioning": {
      "beatmap": "1.0.0",
      "fileFormat": "1.0.0"
    }
  });
});


