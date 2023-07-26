import chalk from 'chalk'
import { existsSync } from 'fs'
import { resolve } from 'node:path'
import { normalizePath } from 'vite'
import {
  SARD_CONFIG_NAME,
  CUSTOM_PATH_R,
  CWD_DIR,
  sardConfig,
} from '../utils/constants.js'
import { logWarning } from '../utils/logger.js'

async function transform() {
  const { styles } = sardConfig

  if (!Array.isArray(styles)) {
    return
  }

  try {
    return styles
      .map((path) => {
        const stylePath = normalizePath(resolve(CWD_DIR, path))
        if (!existsSync(stylePath)) {
          logWarning(
            `Can't find module "${stylePath}"\n  File: ${chalk.cyan(
              SARD_CONFIG_NAME,
            )}`,
          )
          throw new Error()
        }
        return stylePath
      })
      .map((path) => `@import '${path}';`)
      .join('\n')
  } catch {
    return ''
  }
}

export function loadStyles() {
  return {
    name: 'loadStyles',
    enforce: 'pre',
    transform(_, id) {
      if (CUSTOM_PATH_R.test(id)) {
        return transform()
      }
    },
  }
}
