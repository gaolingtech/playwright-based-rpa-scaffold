import _ from 'lodash'
import * as Electron from 'electron'

// eslint-disable-next-line @typescript-eslint/ban-types
export function createPreloadBinding<Utilities extends Record<string, Function>, BridgeName extends string>(
  bridgeName: BridgeName,
  utilities: Record<keyof Utilities, true>
): (ipcRenderer: Electron.IpcRenderer) => Record<BridgeName, Utilities> {
  return (ipcRenderer: Electron.IpcRenderer) => {
    return {
      [bridgeName]: _.fromPairs(
        Object.keys(utilities).map((key: keyof Utilities) => [
          key,
          (params: any) => {
            if (typeof params === 'function') {
              return ipcRenderer.on(key as string, (_event, args) => params(args))
            }

            return ipcRenderer
              .invoke(`${bridgeName}-${key as string}`, params)
              .then(({ result, error }) => {
                if (error) return Promise.reject(error)
                return result
              })
          }
        ])
      )
    } as unknown as Record<BridgeName, Utilities>
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function createMainBinding<Utilities extends Record<string, Function>, BridgeName extends string>(
  bridgeName: BridgeName,
  builder: () => Utilities
) {
  const utilities = builder()

  return (ipcMain: Electron.IpcMain) => {
    for (const [key, handler] of _.toPairs(utilities)) {
      ipcMain.handle(`${bridgeName}-${key}`, async (_event, args) => {
        try {
          return {
            error: null,
            result: await handler(args)
          }
        } catch (e: any) {
          return {
            error: e,
            result: null
          }
        }
      })
    }
  }
}
