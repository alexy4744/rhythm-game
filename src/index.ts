import superagent from "superagent";

import Game from "@/structures/Game";

import "@/assets/scss/main.scss";

(async () => {
  const beatmap = await superagent
    .get("/beatmaps/violet-soul/violet-soul-novice.json")
    // .get("/beatmaps/violet-soul/violet-soul-advanced.json")
    // .get("/beatmaps/shelter/shelter-normal.json")
    .then(res => res.body);

  Game.start(beatmap, {
    height: window.innerHeight,
    width: window.innerWidth
  });
})();
