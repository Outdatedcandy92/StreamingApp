const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  sendSearchQuery: (query) => ipcRenderer.send('search-query', query),
  onMovieData: (callback) => ipcRenderer.on('movie-data', (event, data) => callback(data)),
  receive: (channel, func) => {
    const validChannels = ['search-data'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});