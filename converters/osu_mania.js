const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) => new Promise(resolve => rl.question(`${question} `, resolve));

const columns = {
  64: 0,
  192: 1,
  320: 2,
  448: 3,
  576: 4,
  704: 5,
  832: 6,
  960: 7,
  1088: 8,
  1216: 9
};

(async () => {
  const filepath = await ask("What is the absolute file path to the beatmap?");

  if (!path.isAbsolute(filepath)) throw new Error("File path is not absolute!");
  if (path.extname(filepath) !== ".osu") throw new Error("File is not an osu beatmap file!");

  const beatmap = fs
    .readFileSync(filepath)
    .toString()
    .trim()
    .split(/\r?\n|\r/g); // Windows uses \r\n, mac uses POSIX so only \n

  if (!beatmap.length) throw new Error("Beatmap file contains no data!");

  const hitObjectsHeader = beatmap.findIndex(line => line === "[HitObjects]");
  if (!hitObjectsHeader) throw new Error("[HitObjects] header not found in beatmap file!");

  const firstHitObject = hitObjectsHeader + 1;
  if (firstHitObject >= beatmap.length) throw new Error("No hit objects found in beatmap file!");

  const notes = [];

  for (let i = firstHitObject; i < beatmap.length; i += 1) {
    const line = beatmap[i];
    if (!line.length) break;

    const parts = line.split(",");

    const column = Number(parts[0]);
    const start = Number(parts[2]);

    if (Number.isNaN(column)) throw new TypeError(`Line ${i}: Column "${column}" is not a number!`);
    if (Number.isNaN(start)) throw new TypeError(`Line ${i}: Start time "${start}" is not a number!`);

    notes.push({
      position: columns[column],
      start: start / 1000
    });
  }

  const output_path = path.join(__dirname, "osu_mania_output");
  if (!fs.existsSync(output_path)) fs.mkdirSync(output_path);

  fs.writeFileSync(
    path.join(output_path, `${Date.now()}.json`),
    JSON.stringify({
      metadata: {
        artist: "CHANGE_ME",
        beatmapper: "CHANGE_ME",
        bpm: 0,
        mp3: "CHANGE_ME",
        title: "CHANGE_ME"
      },
      notes,
      versioning: {
        beatmap: "1.0.0",
        fileFormat: "1.0.0"
      }
    }, null, 2)
  );

  process.stdout.write("Done\n");
  process.exit(0);
})();
