const songs = [
  {
    title: "East Side Flow",
    artist: "Sidhu Moose Wala",
    src: "assets/songs/east side flow.mp3",
    cover: "assets/images/sidhu.jpg",
  },
  {
    title: "LEGEND",
    artist: "Sidhu Moose Wala",
    src: "assets/songs/legend.mp3",
    cover: "assets/images/sidhu.jpg",
  },
  {
    title: "VANCOUVER",
    artist: "Cheema Y",
    src: "assets/songs/vancouver.mp3",
    cover: "assets/images/cheema.jpg",
  },
  {
    title: "JAIYE SAJNA",
    artist: "Satinder Sartaj",
    src: "assets/songs/jaiye.mp3",
    cover: "assets/images/satinder.jpg",
  },
  {
    title: "GAME",
    artist: "Sidhu Moose Wala",
    src: "assets/songs/GAME  (Full Video)  Shooter Kahlon _ Sidhu Moose Wala _ Hunny PK Films _ Gold Media _ 5911 Records.mp3",
    cover: "assets/images/sidhu2.png",
  },
  {
    title: "Hood Famous",
    artist: "Navaan Sandhu",
    src: "assets/songs/Hood Famous ( Official Video ) _ Navaan Sandhu _ Lejend _ Teji Sandhu _ New Punjabi songs 2023.mp3",
    cover: "assets/images/navansandhu.png",
  },
  {
    title: "Kadi Takren Te...",
    artist: "Nusrat Fateh Ali Khan",
    src: "assets/songs/Kadi Takren Te Haal Sunawan (Sanu Rog Laan) - Ustad Nusrat Fateh Ali Khan - OSA Official HD Video.mp3",
    cover: "assets/images/nusrat.png",
  },
  {
    title: "Inj Vichre...",
    artist: "Nusrat Fateh Ali Khan",
    src: "assets/songs/INJH VICHRE - Nusrat Fateh Ali Khan - Synth Remix.mp3",
    cover: "assets/images/nusrat.png",
  },
  {
    title: "Tibeyan da putt",
    artist: "Sidhu Moose Wala",
    src: "assets/songs/TIBEYAN DA PUTT (Full Video) Sidhu Moose Wala _ The Kidd _ Gold Media _ Latest Punjabi Song 2020.mp3",
    cover: "assets/images/sidhu3.png",
  },
  {
    title: "Tagde Ghar De..",
    artist: "Cheema Y",
    src: "assets/songs/Tagde Gharde (Official Audio) Cheema Y _ Gur Sidhu.mp3",
    cover: "assets/images/cheema.jpg",
  },
  {
    title: "Jaan se Guzarte Hain..",
    artist: "Khan Saab",
    src: "assets/songs/Jaan Se Guzarte Hain (Audio)_ Dhurandhar The Revenge _ Shashwat S _ Nusrat Fateh Ali,Khan S,Irshad K.mp3",
    cover: "assets/images/khansaab.png",
  },
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const playlistCount = document.querySelector(".playlist-count");
const playerCard = document.querySelector(".player-card");
let songIndex = 0;

function setPlaybackState(isPlaying) {
  playBtn.innerHTML = isPlaying
    ? '<i class="fa-solid fa-pause"></i>'
    : '<i class="fa-solid fa-play"></i>';
  playerCard.classList.toggle("is-playing", isPlaying);
  cover.classList.toggle("is-playing", isPlaying);
}

function loadSong(index) {
  const song = songs[index];
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  updatePlaylist();
  if (audio.paused) {
    setPlaybackState(false);
  } else {
    setPlaybackState(true);
  }
}

function playSong() {
  audio.play().catch(() => {});
  setPlaybackState(true);
}

function pauseSong() {
  audio.pause();
  setPlaybackState(false);
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songIndex);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  progress.max = audio.duration || 0;
  progress.value = audio.currentTime || 0;
  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

audio.addEventListener("play", () => setPlaybackState(true));
audio.addEventListener("pause", () => setPlaybackState(false));
audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songIndex);
  playSong();
});

function renderPlaylist() {
  playlist.innerHTML = "";
  playlistCount.innerText = `${songs.length} tracks`;

  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="song-name">${song.title}</span><span class="song-artist">${song.artist}</span>`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songIndex);
      playSong();
    });
    playlist.appendChild(li);
  });
}

function updatePlaylist() {
  const items = document.querySelectorAll("#playlist li");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === songIndex);
  });
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

renderPlaylist();
loadSong(songIndex);
setPlaybackState(false);
