import { relative, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import {
  CWD,
  DEV_PORT,
  PREVIEW_PORT,
  sardConfig,
  SITE_DIR,
} from '../utils/constants.js'
import { transformIndexHtml } from '../plugins/transformIndexHtml.js'
import { loadSardConfig } from '../plugins/loadSardConfig.js'
import { transformRouter } from '../plugins/transformRouter.js'
import { transformMarkdown } from '../plugins/transformMarkdown.js'
import { loadStyles } from '../plugins/loadStyles.js'
import { transformDemo } from '../plugins/transformDemo.js'
import { deepMerge } from './deepMerge.js'

export function mergeViteConfig(options) {
  return deepMerge(
    {
      configFile: false,
      plugins: [
        transformIndexHtml(),
        loadSardConfig(),
        transformRouter(),
        transformMarkdown(),
        transformDemo(),
        loadStyles(),
        react(),
      ],
      root: SITE_DIR,
      base: sardConfig.base,
      publicDir: resolve(CWD, sardConfig.publicDir),
      server: {
        port: DEV_PORT,
        host: true,
      },
      build: {
        outDir: relative(SITE_DIR, resolve(CWD, sardConfig.buildSite.outDir)),
        emptyOutDir: true,
      },
      preview: {
        port: PREVIEW_PORT,
      },
      resolve: {
        alias: sardConfig.alias,
      },
      css: {
        postcss: {
          plugins: [autoprefixer({})],
        },
      },
    },
    options,
  )
}

export default mergeViteConfig
