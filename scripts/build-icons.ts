import { resolve } from 'node:path'
import { build } from './utils/build'

export const iconRootDir = resolve(process.cwd(), 'packages/icons')
export const iconOutDir = resolve(process.cwd(), 'packages/icons/dist')

export async function buildIcons() {
  await build({
    rootDir: iconRootDir,
    outDir: iconOutDir,
  })
}

buildIcons()
