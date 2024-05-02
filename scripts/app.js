async function readMusic() {
  const music = [];
  const response = await fetch("songs/songs.json");
  const txt = await response.text();
  console.group(txt);
  return music;
}

console.log(readMusic());
