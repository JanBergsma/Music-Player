async function readMusic() {
  const response = await fetch("songs/songs.json");
  return JSON.parse(await response.text());
}

const playList = await readMusic();
const playerSongImage = document.getElementById("player-song-image");
const playerSongTitle = document.getElementById("player-song-title");
const playerSongAuthor = document.getElementById("player-song-author");
const playerAudio = document.getElementById("player-audio");
const backwardButton = document.getElementById("player-back");
const playButton = document.getElementById("player-play");
const forwardButton = document.getElementById("player-forward");
const currentTime = document.getElementById("player-song-current-time");
const endTime = document.getElementById("player-song-total-time");
const playerBar = document.getElementById("player-bar");
const playerProgress = document.getElementById("player-progress");

let currentSong = 0;
updatePlayer();

playButton.addEventListener("click", (e) => {
  if (playerAudio.paused || playButton.playbackRate === 0) {
    playerAudio.play();
    playerProgress.style.width = "0";
  } else {
    playerAudio.pause();
  }
});

playerAudio.addEventListener("timeupdate", (e) => {
  endTime.innerText = formatDuration(playerAudio.duration);
  currentTime.innerText = formatDuration(playerAudio.currentTime);
  playerProgress.style.width = `${(playerBar.clientWidth * playerAudio.currentTime) / playerAudio.duration}px`;
});

playerBar.addEventListener("click", (e) => {
  const sliderValue =
    (e.pageX - e.currentTarget.getClientRects()[0].left) /
    e.currentTarget.clientWidth;
  playerAudio.currentTime = playerAudio.duration * sliderValue;
});

backwardButton.addEventListener("click", (e) => {
  currentSong = (currentSong - 1) % playList.length;
  updatePlayer();
  playerAudio.play();
  playerProgress.style.width = "0";
});

forwardButton.addEventListener("click", (e) => {
  currentSong = (currentSong + 1) % playList.length;
  updatePlayer();
  playerAudio.play();
  playerProgress.style.width = "0";
});

playerAudio.addEventListener("ended", (e) => {
  currentSong = (currentSong + 1) % playList.length;
  updatePlayer();
  playerAudio.play();
  playerProgress.style.width = "0";
});

const formatDuration = (t) =>
  new Date(t * 1000).toLocaleTimeString([], {
    minute: "numeric",
    second: "2-digit",
  });

function updatePlayer() {
  playerSongImage.src = playList[currentSong].image;
  playerAudio.src = playList[currentSong].source;
  playerSongTitle.innerText = playList[currentSong].name;
  playerSongAuthor.innerText = playList[currentSong].composer;
}
