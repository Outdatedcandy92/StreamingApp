const { ipcRenderer } = require('electron');

document.getElementById('search-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const query = event.target.value;
    ipcRenderer.send('search-query', query);
  }
});