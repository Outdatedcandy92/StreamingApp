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
  },
  sendTorrentSearch: (movieTitle) => ipcRenderer.send('torrent-search', movieTitle),
  onTorrentResults: (callback) => ipcRenderer.on('torrent-results', (event, torrents) => callback(torrents)),
  send: (channel, data) => {
    // List of allowed channels
    let validChannels = ['torrent-selected'];
    if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
    }
},
onTorrentResults: (callback) => {
    ipcRenderer.on('torrent-results', (event, data) => {
        callback(data);
    });
}
  
});