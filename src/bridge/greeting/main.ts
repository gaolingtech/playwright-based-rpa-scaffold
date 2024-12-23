import { createMainBinding } from '../../utils/bridge-helper'
import { GreetingBridgeUtilities } from './types'

export const GreetingBridgeMainBinding = createMainBinding<GreetingBridgeUtilities, 'greeting'>(
  'greeting',
  () => ({
    ping() {
      return Promise.resolve('pong')
    },
    reject(): Promise<void> {
      return Promise.reject(new Error(Date.now().toString()))
    }
  })
)
