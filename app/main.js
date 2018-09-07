const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

require('electron-reload')(__dirname);

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1300, height: 900 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

