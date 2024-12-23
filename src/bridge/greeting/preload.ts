import { createPreloadBinding } from '../../utils/bridge-helper'
import { GreetingBridgeUtilities } from './types'

export const GreetingBridgePreloadBinding = createPreloadBinding<GreetingBridgeUtilities, 'greeting'>(
  'greeting',
  {
    ping: true, reject: true
  }
)
