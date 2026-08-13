import { watchPostEffect, type App } from 'vue'
import { windowInfo } from './components'
import { cssVarName, pascalCase } from './utils'

import components from './all-components'

function installer(
  app: App,
  options: {
    namespace?: string
  } = {},
) {
  const { namespace = 's' } = options

  Object.keys(components).forEach((key) => {
    app.component(`${pascalCase(namespace)}${key}`, components[key])
  })
}

function prepareEnvironment() {
  watchPostEffect(() => {
    document.documentElement.style.setProperty(
      cssVarName('status-bar-height'),
      windowInfo.statusBarHeight + 'px',
    )
  })
}

prepareEnvironment()

export * from './components'
export * from './use'
export * from './utils'
export * from './locale'
export { installer }
