import fse from 'fs-extra'
import { resolve } from 'node:path'
import { build as viteBuild } from 'vite'
import { CWD_DIR, sardConfig, TEMP_STYLE_NAME } from '../utils/constants.js'
import deepMerge from '../utils/deepMerge.js'
import child_process from 'child_process'

const { build: buildConfig } = sardConfig

const outDir = resolve(CWD_DIR, sardConfig.build.outDir)

function mergedBuildLibConfig(options) {
  return deepMerge(
    {
      configFile: false,
      build: {
        copyPublicDir: false,
        outDir,
        lib: {},
      },
    },
    options,
  )
}

void function buildLib() {
  return viteBuild(
    mergedBuildLibConfig({
      build: {
        lib: {
          entry: resolve(CWD_DIR, buildConfig.entry),
          name: buildConfig.name,
          formats: ['es'],
          fileName: buildConfig.fileName,
        },
        minify: false,
        rollupOptions: {
          external: buildConfig.external,
        },
      },
    }),
  )
}

async function buildCss() {
  await viteBuild(
    mergedBuildLibConfig({
      build: {
        emptyOutDir: false,
        lib: {
          entry: resolve(CWD_DIR, buildConfig.cssEntry),
          formats: ['es'],
          fileName: TEMP_STYLE_NAME,
        },
      },
    }),
  )

  await fse.remove(resolve(outDir, `${TEMP_STYLE_NAME}.js`))

  await fse.rename(
    resolve(outDir, 'style.css'),
    resolve(outDir, `${buildConfig.fileName}.css`),
  )
}

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

export async function build() {
  await buildModuleAndDeclare()
  await buildCss()
}
