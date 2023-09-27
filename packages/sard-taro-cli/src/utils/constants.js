import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSardConfig } from './getSardConfig.js'

// path
export const ROOT_DIR = resolve(
  fileURLToPath(dirname(import.meta.url)),
  '../../',
)
export const SITE_DIR = resolve(ROOT_DIR, './src/site')
export const CWD_DIR = process.cwd()

// sard config
export const SARD_CONFIG_NAME = 'sard.config.js'

export const sardConfig = getSardConfig()

export const VIRTUAL_SARD_CONFIG = 'virtual:sard-config'

// site
export const DEV_PORT = 7761
export const PREVIEW_PORT = 7760

export const DEFAULT_README_NAME = 'README.md'

export const DEMO_DIR = 'demo'

export const MD_PATH_R = /\.md$/
export const CUSTOM_PATH_R = /\/site\/custom\.scss$/
export const ROUTER_PATH_R = /\/site\/router\.tsx/

export const MD_DEMO_CODE_SEPARATOR = '<script type="code"></script>'

export const TEMP_STYLE_NAME = '__TEMP_STYLE__'

// demo

// mobile
export const MOBILE_COMP_PATH_R = /\/mobile\/index.tsx$/
export const MOBILE_URL_PLACEHOLDER = '__MOBILE_URL_PLACEHOLDER__'
export const MOBILE_BUILD_PATH = '/sard-taro/mobile/'
