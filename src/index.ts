import superagent from "superagent";

import Beatmap from "@/structures/Beatmap";
import Game from "@/structures/Game";

import "@/assets/scss/main.scss";

(async () => {
  const beatmap = await superagent
    // .get("/beatmaps/frozen-world/frozen-world-easy.json")
    // .get("/beatmaps/frozen-world/frozen-world-hard.json")
    .get("/beatmaps/violet-soul/violet-soul-novice.json")
    // .get("/beatmaps/violet-soul/violet-soul-advanced.json")
    // .get("/beatmaps/shelter/shelter-normal.json")
    .then((res => new Beatmap(res.body.metadata, res.body.notes)));

  Game.start(beatmap, {
    height: window.innerHeight,
    width: window.innerWidth
  });
})();
