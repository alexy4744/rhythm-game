import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Game from "@/structures/Game";

import "@/assets/scss/main.scss";

document.querySelector("#btn-start")?.addEventListener("click", async () => {
  document.getElementById("start-wrapper")?.remove();

  const game = await Game.create({
    "metadata": {
      "artist": "Test",
      "beatmapper": "Me",
      "bpm": 146,
      "mp3": "/flag.mp3",
      "title": "Test"
    },
    "notes": [
      // { "column": 1, "start": 6.5 },
      { "column": 1, "start": 0 },
      { "column": 2, "start": 9.8 },
      { "column": 3, "start": 13.1 },
      { "column": 4, "start": 16.4 },
      { "column": 5, "start": 26.3 },
      { "column": 1, "start": 29.5 },
      { "column": 2, "start": 32.8 },
      { "column": 3, "start": 36.1 },
      { "column": 4, "start": 39.4 },
      { "column": 5, "start": 42.7 },
      { "column": 1, "start": 44.1 },
      { "column": 2, "start": 46 },
      { "column": 3, "start": 49.3 },
      { "column": 4, "start": 52.6 }
    ],
    "versioning": {
      "beatmap": "1.0.0",
      "fileFormat": "1.0.0"
    }
  });

  game.start();

  new OrbitControls(game.video.camera, game.video.renderer.domElement);
});
