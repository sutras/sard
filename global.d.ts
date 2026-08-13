declare module 'vue' {
  export interface GlobalComponents {
    DocDemo: typeof import('./src/components/demo-icon.vue').default
    DocMenu: typeof import('./src/components/menu/menu.vue').default
    DocPage: typeof import('./src/components/page.vue').default
    DocTitle: typeof import('./src/components/title.vue').default
    DocBadgeBox: typeof import('./src/components/badge-box.vue').default
    DemoIcon: typeof import('./src/components/demo-icon.vue').default
  }
}

export {}
