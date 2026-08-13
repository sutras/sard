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

export const gitRepositories = [
  {
    name: 'Aliyun',
    branch: 'gh-pages',
    docsRepo: 'git@wzt.zone:/home/git/sard-docs.git',
  },
  {
    name: 'Github',
    icon: 'github',
    url: 'https://github.com/sutras/sard',
    branch: 'gh-pages',
    docsRepo: 'https://github.com/sutras/sard-docs.git',
    main: true,
  },
  {
    name: 'Gitee',
    icon: 'gitee',
    url: 'https://gitee.com/sutras/sard',
    branch: 'gh-pages',
    docsRepo: 'https://gitee.com/sutras/sard-docs.git',
    pages: 'https://gitee.com/sutras/sard/pages',
  },
]

export const dependenciesTypes = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]
