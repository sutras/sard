import { glob, readFile, rename, rm } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import ignore from 'ignore'
import { existsSync, globSync, readFileSync } from 'node:fs'
import { resolvePackageJson, writeFileWithDirs } from './utils'
import { exec } from 'node:child_process'
import consola from 'consola'
import { compileAllScript } from './transform'
import * as sass from 'sass'
import { Listr, ListrTask } from 'listr2'

async function deleteDistDir(dist: string) {
  const ig = ignore().add(readFileSync(resolve(process.cwd(), '.gitignore')).toString())
  const relativePath = relative(process.cwd(), dist)
  if (!ig.ignores(relativePath)) {
    throw Error(`${relativePath} 不在 .gitignore 忽略规则中，有删除重要文件的风险`)
  }

  await rm(dist, {
    force: true,
    recursive: true,
  })
}

function getVueTsConfig(options: { rootDir: string; outDir: string; exclude: string[] }) {
  const { rootDir, outDir, exclude } = options

  return {
    include: [`${rootDir}/**/*`],
    exclude,
    compilerOptions: {
      outDir: outDir,
      rootDir: rootDir,

      target: 'ESNext',
      module: 'ESNext',
      esModuleInterop: true,
      skipLibCheck: true,
      declaration: true,
      emitDeclarationOnly: true,
      types: ['vite/client'],

      /* Bundler mode */
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      moduleDetection: 'force',
      jsx: 'preserve',
      jsxImportSource: 'vue',
      allowImportingTsExtensions: true,

      /* Linting */
      strict: true,
      noImplicitAny: false,
      noUnusedLocals: false,
      noUnusedParameters: false,
    },
  }
}

const tempDir = resolve(process.cwd(), 'node_modules/.sard-temp/')

const tsconfigPath = resolve(tempDir, 'tsconfig.json')

async function generateDeclaration(options: {
  rootDir: string
  outDir: string
  exclude: string[]
}) {
  const { rootDir, outDir, exclude } = options

  await writeFileWithDirs(
    tsconfigPath,
    JSON.stringify(
      getVueTsConfig({
        rootDir,
        outDir,
        exclude,
      }),
    ),
  )

  const config = [['vue-tsc'], ['-p', tsconfigPath]].flat(Infinity).join(' ')

  await new Promise<void>((resolve, reject) => {
    const child = exec(`${config}`, async (err) => {
      await rm(tsconfigPath)
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })

    child.stdout!.on('data', (data) => {
      consola.log(data)
    })
  })

  for await (const entry of glob(resolve(outDir, './**/*.vue.js'))) {
    await rm(entry)
  }

  for await (const entry of glob(resolve(outDir, './**/*.vue.d.ts'))) {
    await rename(entry, entry.replace(/\.vue\.d\.ts$/, '.d.ts'))
  }
}

export const dependenciesTypes = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]

async function getExternals(rootDir: string) {
  const { default: pkgJson } = await import(resolve(rootDir, 'package.json'), {
    with: { type: 'json' },
  })

  return dependenciesTypes
    .map((key) => {
      return Object.keys(pkgJson[key] || {})
    })
    .flat(Infinity) as string[]
}

async function compileScript(options: { rootDir: string; outDir: string; exclude: string[] }) {
  const { rootDir, outDir, exclude } = options

  await compileAllScript({
    rootDir: rootDir,
    outDir: outDir,
    externals: await getExternals(rootDir),
    exclude,
  })
}

async function handleGlobalComponent(options: { rootDir: string; outDir: string }) {
  const { rootDir, outDir } = options

  const file = resolve(rootDir, 'global.d.ts')

  if (!existsSync(file)) return

  let content = await readFile(file, {
    encoding: 'utf8',
  })

  content = content.replace(/\.(vue|tsx|ts)/gm, '')

  await writeFileWithDirs(resolve(outDir, 'global.d.ts'), content)
}

async function compileStyle(options: { rootDir: string; outDir: string; exclude: string[] }) {
  const { rootDir, outDir, exclude } = options

  const files = globSync(resolve(rootDir, './**/*.{scss,css}'), {
    exclude,
  })

  for (const file of files) {
    const result = sass.compile(file, {
      style: 'compressed',
    })
    await writeFileWithDirs(file.replace(rootDir, outDir).replace('.scss', '.css'), result.css)
  }
}

async function copyResolvedPackageJson(options: { rootDir: string; outDir: string }) {
  const { rootDir, outDir } = options

  const result = await resolvePackageJson(
    resolve(rootDir, 'package.json'),
    resolve(process.cwd(), 'packages'),
  )
  await writeFileWithDirs(resolve(outDir, 'package.json'), result)
}

export async function build(options: { rootDir: string; outDir: string; tasks?: ListrTask[] }) {
  const { rootDir, outDir, tasks: _tasks = [] } = options

  const exclude = ['**/node_modules/', '**/dist/', '**/*.test.*', '**/__tests__/'].map((item) => {
    return resolve(rootDir, item)
  })

  const tasks = new Listr(
    [
      {
        title: `删除 ${outDir} 目录`,
        task: () => deleteDistDir(outDir),
      },
      {
        title: `生成类型文件`,
        task: () =>
          generateDeclaration({
            rootDir,
            outDir,
            exclude,
          }),
      },
      {
        title: `编译脚本`,
        task: () =>
          compileScript({
            rootDir,
            outDir,
            exclude,
          }),
      },
      {
        title: `全局组件类型处理`,
        task: () =>
          handleGlobalComponent({
            rootDir,
            outDir,
          }),
      },
      {
        title: `编译样式`,
        task: () =>
          compileStyle({
            rootDir,
            outDir,
            exclude,
          }),
      },
      {
        title: `复制 package.json 文件`,
        task: () =>
          copyResolvedPackageJson({
            rootDir,
            outDir,
          }),
      },
      ..._tasks,
    ],
    {},
  )

  try {
    await tasks.run()
    consola.success(`已完成所有构建流程`)
  } catch (e) {
    consola.error(e)
  }
}
