import { app, BrowserWindow } from "electron"
import { join as pathJoin } from 'path';
import {existsSync as fsExists } from 'fs';

let win: null | BrowserWindow = null;

function createWindow () {
  // Create the browser window.
  const preloadJs = pathJoin(__dirname, '../preload/index.js');

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadJs,
      // nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  // win.loadFile('dist/index.html')
  win.loadURL(`file://${pathJoin(__dirname, '../../index.html')}`)

    // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
