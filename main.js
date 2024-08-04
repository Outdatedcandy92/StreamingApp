const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('select-file', async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Videos', extensions: ['mkv', 'avi', 'mp4'] }],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    event.sender.send('file-selected', result.filePaths[0]);
  }
});

ipcMain.on('play-file', (event, filePath) => {
  const windowHandle = mainWindow.getNativeWindowHandle();
  const handleHex = windowHandle.toString('hex');
  const handleId = parseInt(handleHex, 16);

  const mpvProcess = spawn('mpv', [
    filePath,
    `--wid=${handleId}`,
    '--force-window=yes',
    '--hwdec=auto',
    '--vo=gpu',
  ]);

  mpvProcess.on('error', (err) => {
    console.error('Failed to start MPV:', err);
  });
});