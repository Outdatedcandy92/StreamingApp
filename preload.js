const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  playVideo: (filePath) => ipcRenderer.invoke('play-video', filePath),
  selectFile: () => ipcRenderer.invoke('select-file'),
});