const { ipcRenderer } = require('electron');

function playVideo(videoPath) {
  ipcRenderer.send('play-video', videoPath);
}

function controlVideo(command) {
  ipcRenderer.send('control-video', command);
}

document.getElementById('play-button').addEventListener('click', () => {
  playVideo('dev/vid.mp4');
});

document.getElementById('pause-button').addEventListener('click', () => {
  controlVideo('pause');
});

document.getElementById('stop-button').addEventListener('click', () => {
  controlVideo('stop');
});
