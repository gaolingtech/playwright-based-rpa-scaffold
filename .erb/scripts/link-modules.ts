import fs from 'fs'
import webpackPaths from '../configs/paths'

const { srcNodeModulesPath } = webpackPaths
const { appNodeModulesPath } = webpackPaths

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction')
}
