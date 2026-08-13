import { copyFile } from 'node:fs/promises'
import { libRootDir, libOutDir } from './config'
import { build } from './utils/build'
import { resolve } from 'node:path'

async function copyRootReadme(outDir: string) {
  await copyFile(resolve(process.cwd(), 'README.md'), resolve(outDir, 'README.md'))
}

export async function buildSard() {
  await build({
    rootDir: libRootDir,
    outDir: libOutDir,
    tasks: [
      {
        title: `复制根 README.md 文件`,
        task: () => copyRootReadme(libOutDir),
      },
    ],
  })
}

buildSard()
