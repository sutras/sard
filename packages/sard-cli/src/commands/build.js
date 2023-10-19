import fse from 'fs-extra'
import path, { resolve } from 'node:path'
import { CWD_DIR, sardConfig } from '../utils/constants.js'
import child_process from 'child_process'
import { glob } from 'glob'
import consola from 'consola'
// import * as sass from 'sass'

const { build: buildConfig } = sardConfig

const outDir = resolve(CWD_DIR, buildConfig.outDir)
const srcDir = resolve(CWD_DIR, buildConfig.srcDir)
// const cssEntry = resolve(CWD_DIR, buildConfig.cssEntry)

async function deleteOutDir() {
  await new Promise((resolve) => {
    const child = child_process.exec(`rimraf ${outDir}`)
    child.on('close', () => {
      consola.success(`已删除 ${outDir} 目录`)
      resolve()
    })
  })
}

const sharedConfig = [
  ['tsc'],
  [`${srcDir}/**/*.{tsx,ts}`, `${srcDir}/*.ts`],
  ['--target', 'esnext'],
  ['--jsx', 'react-jsx'],
  ['--resolveJsonModule'],
  ['--esModuleInterop'],
  ['--declaration'],
  ['--skipLibCheck'],
  ['-moduleResolution', 'node'],
]

async function buildCommonjs() {
  const config = [
    sharedConfig,
    ['--module', 'commonjs'],
    ['--outDir', 'dist/cjs'],
  ]
    .flat(Infinity)
    .join(' ')

  await new Promise((resolve, reject) => {
    child_process.exec(`${config}`, (err, stdout) => {
      if (err) {
        reject(stdout)
      } else {
        consola.success('已完成 commonjs 打包')
        resolve()
      }
    })
  })
}

async function buildESModule() {
  const config = [
    sharedConfig,
    ['--module', 'esnext'],
    ['--outDir', 'dist/esm'],
  ]
    .flat(Infinity)
    .join(' ')

  await new Promise((resolve, reject) => {
    child_process.exec(`${config}`, (err, stdout) => {
      if (err) {
        reject(stdout)
      } else {
        consola.success('已完成 ESModule 打包')
        resolve()
      }
    })
  })
}

async function buildJS() {
  await buildESModule()
  await buildCommonjs()
}

async function copyFont() {
  const srcFont = path.resolve(srcDir, 'icon/font/iconfont.ttf')
  await fse.copyFile(srcFont, path.resolve(outDir, 'icon/font/iconfont.ttf'))
  await fse.copyFile(
    srcFont,
    path.resolve(outDir, 'esm/icon/font/iconfont.ttf'),
  )
  await fse.copyFile(
    srcFont,
    path.resolve(outDir, 'cjs/icon/font/iconfont.ttf'),
  )
  consola.success('已完成 font 拷贝')
}

// async function combineCompile() {
//   const result = sass.compile(cssEntry, {
//     style: 'compressed',
//   })
//   await fse.outputFile(path.resolve(outDir, './index.css'), result.css)
// }

// async function separateCompile() {
//   const result = await glob(path.resolve(srcDir, './*/index.scss'))
//   const targetResult = result.map((file) =>
//     path.resolve(
//       path.dirname(path.resolve(outDir, '.' + file.replace(srcDir, ''))),
//       'index.css',
//     ),
//   )

//   await Promise.all(
//     result.map(async (source, index) => {
//       const target = targetResult[index]
//       const result = sass.compile(source, {
//         style: 'compressed',
//       })
//       await fse.outputFile(target, result.css)
//     }),
//   )
// }

async function copyScss() {
  const result = await glob(path.resolve(srcDir, './**/*.scss'))
  const targetResult = result.map((file) =>
    path.resolve(outDir, '.' + file.replace(srcDir, '')),
  )

  await Promise.all(
    result.map(async (source, index) => {
      const target = targetResult[index]
      const targetPath = path.dirname(target)
      if (!fse.existsSync(targetPath)) {
        fse.mkdirSync(targetPath)
      }
      await fse.copyFile(source, target)
    }),
  )

  consola.success('已完成 scss 拷贝')
}

async function buildCss() {
  // await combineCompile()
  // await separateCompile()
  await copyScss()
}

export async function build() {
  try {
    await deleteOutDir()
    await buildJS()
    await buildCss()
    await copyFont()
    consola.success('已完成所有构建流程')
  } catch (err) {
    consola.error('构建失败')
    console.log(err)
  }
}
