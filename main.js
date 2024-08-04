require('dotenv').config();
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow).catch(err => console.error('Failed to create window:', err));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('search-query', async (event, query) => {
  const apiKey = process.env.API_KEY;
  const url = `http://www.omdbapi.com/?t=${query}&apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);


    const dataPath = path.join(__dirname, 'data.json');
    fs.writeFileSync(dataPath, JSON.stringify(response.data, null, 2), 'utf-8');
    console.log('Data written to data.json');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


//TMDB API