const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  sendSearchQuery: (query) => ipcRenderer.send('search-query', query),
  onMovieData: (callback) => ipcRenderer.on('movie-data', (event, data) => callback(data)),
  sendInfoQuery: (query) => ipcRenderer.send('info-query', query),
  receive: (channel, func) => {
    const validChannels = ['search-data'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
  },
  remote: {
    getCurrentWindow: () => remote.getCurrentWindow()
  }
  
});