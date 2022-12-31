const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const random = document.getElementById('random');
const imageSrc = document.getElementById('images');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title')
const restart = document.getElementById('restart')
const progress = document.getElementById('progress');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songs = ['Hey', 'Summer', 'Ukulele'];
const images = ['Hey','Summer','Ukulele'];
let songIndex = 2;
let imageIndex = 2

loadSong(songs[songIndex],images[imageIndex]);
function loadSong(songs,imageFirst) {
  audio.src = `music/${songs}.mp3`;
  imageSrc.src = `img/${imageFirst}.jpeg`;
  title.textContent = songs;

}
function playSong() {
  musicContainer.classList.add('play');
  playBtn.classList.remove('fa-play');
  playBtn.classList.add('fa-pause');
  audio.play();
}

function randomSong(){
  songsInPlaylist = songs.length 
  randomNumber = Math.floor(Math.random()* songsInPlaylist)

  loadSong(songs[randomNumber],images[randomNumber])
  playBtn.classList.remove('fa-play');
  playBtn.classList.add('fa-pause');
   audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.classList.add('fa-play');
  playBtn.classList.remove('fa-pause');
  audio.pause();
}
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex],images[imageIndex]);
  playSong();
}
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex],images[imageIndex]);
  playSong();
}
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

random.addEventListener('click', () => {
  randomSong()
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);



function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function restartSong(e){
  const resetSong = audio.duration - audio.duration
  audio.currentTime = resetSong
}

restart.addEventListener('click', () => {
  restartSong()
});

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

