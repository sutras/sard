import type { App } from 'vue'
import BadgeBox from './badge-box.vue'
import Demo from './demo.vue'
import Menu from './menu/menu.vue'
import Page from './page.vue'
import Title from './title.vue'
import DemoIcon from './demo-icon.vue'

const components = {
  BadgeBox,
  Demo,
  Menu,
  Page,
  Title,
}

export function registerDemoComponents(app: App) {
  Object.keys(components).forEach((key) => {
    app.component(`Doc${key}`, components[key as keyof typeof components])
  })

  app.component('DemoIcon', DemoIcon)
}
