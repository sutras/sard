import child_process from 'node:child_process'
import { docsBase, docsRelativeDir } from './config'

import { createServer, mergeConfig } from 'vite'

import viteConfig from '../vite.config'

async function createMobileServer() {
  const server = await createServer(
    mergeConfig(viteConfig, {
      configFile: false,
    }),
  )

  await server.listen()
  server.printUrls()
  server.bindCLIShortcuts({ print: true })

  const url = server.resolvedUrls?.local[0] || ''
  const port = Number(url.match(/:(\d+)/)?.[1] || 0)

  return {
    url,
    port,
  }
}

function createDocsProcess(h5LocalUrl: string, port: number | null) {
  const child = child_process.exec(
    `vitepress dev ${docsRelativeDir} --base ${docsBase} --host ${port ? `--port ${port + 1}` : ''}`,
    {
      env: {
        ...process.env,
        VITE_H5_LOCAL_URL: h5LocalUrl,
        FORCE_COLOR: 'true',
        CI: 'false',
      },
    },
  )

  child.stdout?.on('data', (data) => {
    console.log(data)
  })

  child.stderr?.on('data', (data) => {
    console.error(data)
  })

  return child
}

export async function dev() {
  const { url, port } = await createMobileServer()

  createDocsProcess(url, port)
}

dev()
