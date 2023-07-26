import { createServer } from 'vite'
import mergeViteConfig from '../utils/mergeViteConfig.js'
import { forkChildProcess } from './dev-demo.js'

export async function dev() {
  const childProcess = forkChildProcess()

  childProcess.on('message', async ({ type, data }) => {
    if (type === 'url') {
      process.sard.url = data

      const server = await createServer(mergeViteConfig())
      await server.listen()
      server.printUrls()
    }
  })
}
