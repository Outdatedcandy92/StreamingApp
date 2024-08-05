require('dotenv').config();
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

let apiKey = process.env.API_KEY;
let win

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'Artwork/logo-01.png'),
    autoHideMenuBar: true
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

  const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);


    // remove later
    const dataPath = path.join(__dirname, 'logs/search-query.json');
    fs.writeFileSync(dataPath, JSON.stringify(response.data, null, 2), 'utf-8');
    console.log('Data written to data.json');

    win.loadFile('search.html').then(() => {
      win.webContents.send('search-data', response.data);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

ipcMain.on('info-query', async (event,query) => {
  console.log('info-query', query);
  const url = `http://www.omdbapi.com/?i=${query}&apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);


    const dataPath = path.join(__dirname, 'logs/info-query.json');
    fs.writeFileSync(dataPath, JSON.stringify(response.data, null, 2), 'utf-8');
    console.log('Data written to data.json');

    win.loadFile('page.html').then(() => {
      win.webContents.send('movie-data', response.data);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


//TMDB API