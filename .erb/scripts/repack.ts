import * as fs from 'fs'
import * as path from 'path'

import * as ReleaseAppPackage from '../../release/app/package.json'
import * as archiver from 'archiver'

const ReleaseFolder = path.resolve(__dirname, '..', '..', 'release')

const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
})
  .on('warning', function(err) {
    if (err.code === 'ENOENT') {
    // log warning
    } else {
    // throw error
      throw err
    }
  })
  .on('error', function(err) {
    throw err
  })

const output = fs.createWriteStream(path.resolve(ReleaseFolder, 'build', `${ReleaseAppPackage.name} v${ReleaseAppPackage.version}.zip`))
archive.pipe(output)
archive.directory(path.resolve(ReleaseFolder, 'build', 'win-unpacked'), false)
archive.finalize()
