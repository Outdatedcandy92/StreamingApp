const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFile: () => ipcRenderer.send('select-file'),
  onFileSelected: (callback) => ipcRenderer.on('file-selected', (event, filePath) => callback(event, filePath)),
  playFile: (filePath) => ipcRenderer.send('play-file', filePath),
});