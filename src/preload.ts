/* eslint no-unused-vars: off */
import * as electron from 'electron'
import { contextBridge } from 'electron'
import { GreetingBridgePreloadBinding } from './bridge/greeting/preload'

const API = {
  ping: 'pong',
  username: process.env.USER,
  ...GreetingBridgePreloadBinding(electron.ipcRenderer)
}

contextBridge.exposeInMainWorld('electron', API)

export type ElectronHandler = typeof API
