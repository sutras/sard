import child_process from 'node:child_process'
import path from 'node:path'
import { libRootDir } from './config'

export async function tag() {
  const packageJson = await import(path.resolve(libRootDir, 'package.json'), {
    with: { type: 'json' },
  })

  await new Promise<void>((resolve, reject) => {
    child_process.exec(`git tag v${packageJson.version}`, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

tag()
