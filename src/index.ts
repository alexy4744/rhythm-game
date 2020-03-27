import superagent from "superagent";

import Game from "@/structures/Game";

import "@/assets/scss/main.scss";

(async () => {
  const beatmap = await superagent
    .get("/beatmaps/shelter/shelter-easy.json")
    .then(res => res.body);

  Game.start(beatmap, {
    height: window.innerHeight,
    width: window.innerWidth
  });
})();
