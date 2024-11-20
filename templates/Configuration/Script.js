
const audioElement = document.getElementById('background-audio');
const volumeControl = document.getElementById('volume-control');
const toggleMusicButton = document.getElementById('toggle-music');

volumeControl.addEventListener('input', function () {
  audioElement.volume = this.value;
});


toggleMusicButton.addEventListener('click', function () {
  if (audioElement.paused) {
    audioElement.play();
    toggleMusicButton.textContent = 'Pausar Música';
  } else {
    audioElement.pause();
    toggleMusicButton.textContent = 'Reproducir Música';
  }
});

