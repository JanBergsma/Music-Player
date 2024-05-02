// requiring path and fs modules
import { readFile, readdir } from "node:fs/promises";
import { writeFileSync } from "fs";

async function createEntry(list) {
  let obj = {};

  for (const file of list) {
    if (file.includes(".json")) {
      const info = JSON.parse(await readFile(file, "utf8"));
      obj = { ...obj, ...info };
    } else if (file.includes(".mp3")) {
      obj.source = file;
    } else {
      obj.image = file;
    }
  }
  return obj;
}

const dir = "./songs";
const dirs = await readdir(dir);
const files = await Promise.all(
  dirs.map((songDir) =>
    readdir(`${dir}/${songDir}/`)
      .then((list) =>
        list.map((name) => `${dir.substring(2)}/${songDir}/${name}`),
      )
      .then((list) => createEntry(list)),
  ),
);
console.log(files);
writeFileSync("songs/songs.json", JSON.stringify(files), "utf8");
