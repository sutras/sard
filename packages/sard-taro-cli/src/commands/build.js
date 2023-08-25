import fse from 'fs-extra'
import path, { resolve } from 'node:path'
import { CWD_DIR, sardConfig } from '../utils/constants.js'
import child_process from 'child_process'
import { glob } from 'glob'
import * as sass from 'sass'

const { build: buildConfig } = sardConfig

const outDir = resolve(CWD_DIR, buildConfig.outDir)
const srcDir = resolve(CWD_DIR, buildConfig.srcDir)
const cssEntry = resolve(CWD_DIR, buildConfig.cssEntry)

async function buildModuleAndDeclare() {
  const config = [
    ['rimraf', outDir],
    ['&&'],
    ['tsc'],
    ['--project', resolve(CWD_DIR, './tsconfig.json')],
  ]
    .flat(Infinity)
    .join(' ')

  await new Promise((resolve) => {
    const child = child_process.exec(`${config}`)
    child.on('close', () => {
      resolve()
    })
  })
}

async function combineCompile() {
  const result = sass.compile(cssEntry, {
    style: 'compressed',
  })
  await fse.outputFile(path.resolve(outDir, './index.css'), result.css)
}

async function separateCompile() {
  const result = await glob(path.resolve(srcDir, './*/index.scss'))
  const targetResult = result.map((file) =>
    path.resolve(
      path.dirname(path.resolve(outDir, '.' + file.replace(srcDir, ''))),
      'index.css',
    ),
  )

  await Promise.all(
    result.map(async (source, index) => {
      const target = targetResult[index]
      const result = sass.compile(source, {
        style: 'compressed',
      })
      await fse.outputFile(target, result.css)
    }),
  )
}

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
}

async function buildCss() {
  await combineCompile()
  await separateCompile()
  await copyScss()
}

export async function build() {
  await buildModuleAndDeclare()
  await buildCss()
}
