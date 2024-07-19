
const { dialog, app, BrowserWindow, ipcRenderer, ipcMain, Menu, shell, MenuItem } = require("electron");



const path = require('path')
const fs = require('fs');
const { splitFile, combineFiles } = require("./core");


let mainWindow;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createMainWindow () {
    // Create a new window with some options
    mainWindow = new BrowserWindow({
      title: "Discord File Splitter by Rednexie",
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "./preload")
      }
    })
  

  
  
  
  
    mainWindow.loadFile(path.join(__dirname, "./index.html"))

  
    mainWindow.on('closed', () => {
      // Dereference the window object
      mainWindow = null
    })
  }
  
  // Call the createWindow function when Electron is ready
  app.on('ready', createMainWindow)

  
  // Quit the app when all windows are closed (except on macOS)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  // Create a new window if none are open (for macOS)
  app.on('activate', () => {
    if (mainWindow === null || mainWindow.getAllWindows().length == 0) {
      createMainWindow()
    
    }
})


app.on('browser-window-blur', async (event) => {

})
app.on('browser-window-focus', () => {

})


ipcMain.on('split-file', async ev => {
  const { canceled, filePaths } = await
  dialog.showOpenDialog(mainWindow, {
    title: "Choose the file you want to split",
    message: 'Select a file to split into parts.',
    buttonLabel: "Split",
    defaultPath: ".",
    properties: ["showHiddenFiles", "dontAddToRecent"],
  })

  if(canceled) return;
  splitFile(filePaths[0]);
})


ipcMain.on('combine-files', async ev => {
  const { canceled, filePaths } = await
  dialog.showOpenDialog(mainWindow, {
    title: "Choose the files you want to combine",
    message: 'Select the files to combine.',
    buttonLabel: "Combine",
    defaultPath: ".",
    properties: ["showHiddenFiles", "dontAddToRecent","multiSelections"],
  })

  if(canceled) return;
  combineFiles(filePaths)
})
