export type GreetingBridgeUtilities = {
  ping(): Promise<string>
  reject(): Promise<void>
}
