/* eslint no-unused-vars: off */
import * as electron from 'electron'
import { contextBridge } from 'electron'
import { GreetingBridge } from './bridge/greeting'

const API = {
  ping: 'pong',
  username: process.env.USER,
  ...GreetingBridge.preloadBindings(electron.ipcRenderer)
}

contextBridge.exposeInMainWorld('electron', API)

export type ElectronHandler = typeof API
