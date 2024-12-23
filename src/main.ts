import { app, ipcMain } from 'electron'
import { createMainWindow, mainWindow } from './windows/MainWindow/main'
import { GreetingBridgeMainBinding } from './bridge/greeting/main'

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'

if (isDebug) {
  require('electron-debug')()
}

process.on('SIGINT', () => {
  console.log('[PROCESS] RECEIVED SIGINT SIGNAL')
})

function registryIpcMainBindings() {
  GreetingBridgeMainBinding(ipcMain)
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app
  .whenReady()
  .then(registryIpcMainBindings)
  .then(createMainWindow)
  .then(() => {
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createMainWindow()
    })

    mainWindow?.on('show', () => {
    })

    mainWindow?.on('closed', () => {
      if (app.isPackaged) {
        app.quit()
        process.exit(0)
      }
    })
  })
  .catch(console.error)
