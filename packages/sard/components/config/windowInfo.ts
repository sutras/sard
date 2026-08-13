import { computed, reactive } from 'vue'

export const windowInfo = reactive({
  pixelRatio: window.devicePixelRatio,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  statusBarHeight: 0,
  navBarHeight: 0,
  tabBarHeight: 0,
})

export const safeAreaInsets = reactive({
  top: computed(() => windowInfo.statusBarHeight + windowInfo.navBarHeight),
  left: 0,
  right: 0,
  bottom: computed(() => windowInfo.tabBarHeight),
})
