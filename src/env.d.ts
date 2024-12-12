import { ElectronHandler } from './preload'
import { Page } from 'playwright'
import { Cursor } from 'ghost-cursor-playwright'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
  }

  let global: typeof globalThis & {
    page: Page
    cursor: Cursor
  }
}
