const path = require('path')

const rootPath = path.join(__dirname, '../..')

const dllPath = path.join(__dirname, '../.dll')

const srcPath = path.join(rootPath, 'src')
const releasePath = path.join(rootPath, 'release')

const appPath = path.join(releasePath, 'app')
const appPackagePath = path.join(appPath, 'package.json')
const appNodeModulesPath = path.join(appPath, 'node_modules')
const srcNodeModulesPath = path.join(srcPath, 'node_modules')

const distPath = path.join(appPath, 'dist')
const distMainPath = path.join(distPath, 'main')
const distRendererPath = path.join(distPath, 'renderer')

const buildPath = path.join(releasePath, 'build')

const _windowsPath = path.join(srcPath, 'windows')
const MainWindow = {
  mainPath: path.join(_windowsPath, 'MainWindow', 'main'),
  rendererPath: path.join(_windowsPath, 'MainWindow', 'renderer')
}

const LicenseWindow = {
  mainPath: path.join(_windowsPath, 'LicenseWindow', 'main'),
  rendererPath: path.join(_windowsPath, 'LicenseWindow', 'renderer')
}

const SettingWindow = {
  mainPath: path.join(_windowsPath, 'SettingsWindow', 'main'),
  rendererPath: path.join(_windowsPath, 'SettingsWindow', 'renderer')
}

export default {
  rootPath,
  dllPath,
  srcPath,
  releasePath,
  appPath,
  appPackagePath,
  appNodeModulesPath,
  srcNodeModulesPath,
  distPath,
  distMainPath,
  distRendererPath,
  buildPath,

  windows: {
    MainWindow,
    LicenseWindow,
    SettingWindow
  },
}
