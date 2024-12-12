import { rimrafSync } from 'rimraf'
import * as fs from 'fs'
import webpackPaths from '../configs/paths'

const foldersToRemove = [
  webpackPaths.distPath,
  webpackPaths.buildPath,
  webpackPaths.dllPath,
]

foldersToRemove.forEach((folder) => {
  if (fs.existsSync(folder)) rimrafSync(folder)
})
