window.electronAPI.onVideoLoaded((videoPath) => {
  const videoElement = document.getElementById('video-player');
  videoElement.src = videoPath;
  videoElement.play();
});