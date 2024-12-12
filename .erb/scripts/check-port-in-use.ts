import chalk from 'chalk'
// @ts-expect-error
import * as detectPort from 'detect-port'

const port = process.env.PORT || '1212'

detectPort(port, (_err: any, availablePort: any) => {
  if (port !== String(availablePort)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`,
      ),
    )
  } else {
    process.exit(0)
  }
})
