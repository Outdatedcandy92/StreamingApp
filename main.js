const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const MPV = require('node-mpv');

let mainWindow;
let mpv;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    const nativeHandleBuffer = mainWindow.getNativeWindowHandle();
    const nativeHandle = nativeHandleBuffer.readUInt32LE(0);

    mpv = new MPV({
      audio_only: false,
      auto_restart: true,
      binary: path.join(__dirname, 'mpv/mpv.exe'),
      options: [`--wid=${nativeHandle}`],
    });

    mpv.on('started', () => {
      console.log('MPV started');
    });

    mpv.on('stopped', () => {
      console.log('MPV stopped');
    });

    ipcMain.handle('play-video', async (event, filePath) => {
      await mpv.load(filePath);
      await mpv.play();
    });

    ipcMain.handle('select-file', async () => {
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{ name: 'Videos', extensions: ['mp4', 'mkv', 'avi'] }],
      });
      if (!result.canceled) {
        return result.filePaths[0];
      }
      return null;
    });
  });
}

app.whenReady().then(createWindow);

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