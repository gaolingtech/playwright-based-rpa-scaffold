/* eslint global-require: off, no-console: off, @typescript-eslint/no-var-requires: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and resumeConfig with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import path from 'path'
import MenuBuilder from './menu'
import dayjs from 'dayjs'
import DayjsDuration from 'dayjs/plugin/duration'
import DayjsRelativeTime from 'dayjs/plugin/relativeTime'
import { resolveHtmlPath } from '../../../shared/utils'
import installer from 'electron-devtools-installer'
import { rootPath } from '../../../backend/path'

dayjs.extend(DayjsDuration)
dayjs.extend(DayjsRelativeTime)

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}

export let mainWindow: BrowserWindow | null = null

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'

const installExtensions = async () => {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return installer(
    extensions.map((name) => installer[name]),
    forceDownload
  )
    .catch(console.log)
}

export async function createMainWindow() {
  if (isDebug) {
    await installExtensions()
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets')

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
  }

  mainWindow = new BrowserWindow({
    show: true,
    width: 1200,
    height: 800,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(rootPath, './.erb/.dll/preload.js')
    }
  })

  void mainWindow.loadURL(resolveHtmlPath('main.html'))

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url)
    return { action: 'deny' }
  })

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
}
