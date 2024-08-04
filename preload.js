const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onVideoLoaded: (callback) => ipcRenderer.on('video-loaded', (event, videoPath) => callback(videoPath))
});