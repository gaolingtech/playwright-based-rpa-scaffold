import { URL } from 'url'
import path from 'path'
import { Stream } from 'node:stream'
import { chromium } from 'playwright'
import { createCursor } from 'ghost-cursor-playwright'
import _ from 'lodash'

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212
    const url = new URL(`http://localhost:${port}`)
    url.pathname = htmlFileName
    return url.href
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`
}

export function sleep(ms: number, randomEnd?: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, randomEnd ? _.random(ms, randomEnd) : ms)
  })
}

export async function stream2buffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const bufferArray = Array<any>()

    stream.on('data', (chunk) => bufferArray.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(bufferArray)))
    stream.on('error', (err) => reject(`error converting stream - ${err}`))
  })
}

export async function connectToChromeBrowser() {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222', { timeout: 1000 })
  const context = browser.contexts()[0]

  global.page = context.pages().filter(i => i.url().includes(process.env.TARGET_WEBSITE_DOMAIN))[0]

  if (!global.page) return new Error('Browser Not Opened')
  
  if (!global.cursor) {
    global.cursor = await createCursor(global.page, { debug: true })
  }
}

