import path, { resolve } from 'node:path'

const CWD = process.cwd()

export const libRootDir = resolve(CWD, 'packages/sard')
export const libOutDir = resolve(CWD, 'packages/sard/dist')

export const iconRootDir = resolve(CWD, 'packages/icons')
export const iconOutDir = resolve(CWD, 'packages/icons/dist')

export const docsRelativeDir = 'packages/docs'

export const docsRootDir = path.resolve(CWD, docsRelativeDir)
export const docsOutDir = path.resolve(CWD, 'docs')
export const docsMobileOutDir = path.resolve(docsOutDir, 'mobile')

export const docsBase = '/'
export const docsMobileBase = `mobile`

export const changelogPath = path.resolve(CWD, 'CHANGELOG.md')

export const dependenciesTypes = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]
