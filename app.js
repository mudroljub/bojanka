const {app, BrowserWindow} = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html')
})
