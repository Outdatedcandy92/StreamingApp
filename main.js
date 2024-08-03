const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const MPV = require('node-mpv');

let mainWindow;
let mpvPlayer;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    const mpvPath = 'C:/Users/Rudy/Downloads/mpv-x86_64-20240721-git-e509ec0/mpv.exe';

    try {
      const windowHandle = mainWindow.getNativeWindowHandle().readUInt32LE(0);
      mpvPlayer = new MPV({
        binary: mpvPath,
        audio_only: false,
        auto_restart: true,
        verbose: true,
        args: [`--wid=${windowHandle}`]
      });

      console.log('MPV player initialized');

      mpvPlayer.start().then(() => {
        console.log('MPV player started');
      }).catch((err) => {
        console.error('Failed to start MPV player:', err);
      });
    } catch (err) {
      console.error('Error initializing MPV player:', err);
    }
  });
}

app.on('ready', createWindow);

ipcMain.on('play-video', (event, videoPath) => {
  mpvPlayer.load(videoPath);
});

ipcMain.on('control-video', (event, command) => {
  if (command === 'play') {
    mpvPlayer.play();
  } else if (command === 'pause') {
    mpvPlayer.pause();
  } else if (command === 'stop') {
    mpvPlayer.stop();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});