import _ from 'lodash'

// eslint-disable-next-line @typescript-eslint/ban-types
export function createBridgeInterface<Utilities extends Record<string, Function>, BridgeName extends string>(
  bridgeName: BridgeName,
  builder: () => Utilities
): {
    mainBindings(ipcMain: Electron.IpcMain): void,
    preloadBindings(ipcRenderer: Electron.IpcRenderer): Record<BridgeName, Utilities>
  } {
  const utilities = builder()

  return {
    mainBindings(ipcMain: Electron.IpcMain) {
      for (const [key, handler] of _.toPairs(utilities)) {
        ipcMain.handle(key, async (_event, args) => {
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
    },
    preloadBindings(ipcRenderer: Electron.IpcRenderer) {
      const keys = Object.keys(utilities)
      return {
        [bridgeName]: _.fromPairs(
          keys.map((key: keyof Utilities) => [
            key,
            (params: any) => {
              if (typeof params === 'function') {
                return ipcRenderer.on(key as string, (_event, args) => params(args))
              }

              return ipcRenderer
                .invoke(key as string, params)
                .then(({ result, error }) => {
                  if (error) return Promise.reject(error)
                  return result
                })
            }
          ])
        )
      }
    }
  }
}
