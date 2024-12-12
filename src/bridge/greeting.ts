import { createBridgeInterface } from '../utils/createBridgeInterface'

type GreetingBridgeUtilities = {
  ping(): Promise<string>
  reject(): Promise<void>
}

export const GreetingBridge = createBridgeInterface<GreetingBridgeUtilities, 'greeting'>(
  'greeting',
  () => ({
    async ping() {
      return 'pong'
    },
    async reject() {
      return Promise.reject(new Error('oops!'))
    }
  })
)
