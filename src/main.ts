import './style/tailwind.css'
import './style/index.scss'

import { createApp, type App } from 'vue'
import { createPinia } from 'pinia'
import { provideColorScheme, provideLocale, installer, windowInfo } from 'sard'

import AppComponent from './App.vue'
import router from './router'

import zhCN from 'sard/locale/lang/zh-CN'
import enUS from 'sard/locale/lang/en-US'
import arSA from 'sard/locale/lang/ar-SA'

import './bridge'
import { registerDemoComponents } from './components'
import { isMobileDevices } from './utils/index'

function prepareEnvironment() {
  if (!isMobileDevices()) {
    windowInfo.statusBarHeight = 54
    document.documentElement.style.setProperty('--s-safe-bottom', '34px')
  }

  document.addEventListener('touchstart', function () {}, { passive: true })
}

function createAppInstance() {
  const app = createApp(AppComponent)

  app.use(createPinia())
  app.use(router)

  return app
}

function setupI18n(app: App) {
  provideLocale(
    app,
    {
      zhCN,
      enUS,
      arSA,
    },
    'zhCN',
  )
}

function registerGlobalComponents(app: App) {
  installer(app)

  registerDemoComponents(app)
}

function mountApp(app: App): void {
  setTimeout(() => {
    app.mount('#app')
  })
}

function bootstrap() {
  prepareEnvironment()

  const app = createAppInstance()

  provideColorScheme(app)

  setupI18n(app)

  registerGlobalComponents(app)

  mountApp(app)
}

bootstrap()
