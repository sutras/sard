<template>
  <section v-if="isComponentDoc" class="mobile-simulator">
    <div class="toolbar">
      <div class="toolbar-btn-group">
        <button class="toolbar-btn minus" @click="onMinus">-</button>
        <button class="toolbar-btn plus" @click="onPlus">+</button>
      </div>
      <div class="toolbar-scale-text">{{ scaleText }}</div>

      <a
        class="toolbar-link"
        :href="previewLink"
        target="_blank"
        rel="noreferrer"
        @click="handleOpenNewWindow"
      >
        在新窗口打开⤴
      </a>
    </div>
    <!-- iPhone 17 -->
    <div
      class="iphone"
      :style="{
        transform: `scale(${scale})`,
      }"
    >
      <!-- 屏幕 -->
      <div class="screen">
        <!-- 屏幕内容 / iframe 区域 -->
        <iframe
          ref="iframeRef"
          class="screen-content"
          :src="previewLink"
          title="iPhone 17 Content"
        ></iframe>

        <!-- 底部指示条 -->
        <div class="home-indicator"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

type BridgeMessage = {
  type?: string
  data?: unknown
}

const route = useRoute()
const iframeRef = ref<HTMLIFrameElement | null>(null)
const previewReady = ref(false)

const componentName = computed(() => {
  const matched = route.path.match(new RegExp(`^${withBase('/components/')}([^/#?]+?)(?:/)?$`))
  return matched?.[1] ?? ''
})

const isComponentDoc = computed(() => Boolean(componentName.value))

const previewOrigin = import.meta.env.VITE_H5_LOCAL_URL || '/mobile/'

const previewLink = computed(() => previewOrigin)

function sendMessage(message: { type: string; data?: any }) {
  iframeRef.value?.contentWindow?.postMessage(message, '*')
}

function postRouteMessage() {
  sendMessage({
    type: 'route',
    data: componentName.value,
  })
}

function handleMessage(event: MessageEvent<BridgeMessage>) {
  if (event.source !== iframeRef.value?.contentWindow) {
    return
  }

  const { type, data } = event.data || {}

  switch (type) {
    case 'loaded':
      previewReady.value = true
      postRouteMessage()
      setTimeout(() => {
        postHashchangeMessage()
        sendThemeData()
      }, 150)
      break
    case 'url':
      window.open(data as string, '_blank')
      break
    default:
      break
  }
}

watch(componentName, () => {
  postRouteMessage()
})

watch(isComponentDoc, (value) => {
  if (!value) {
    previewReady.value = false
  }
})

const postHashchangeMessage = () => {
  sendMessage({
    type: 'hashchange',
    data: decodeURIComponent(location.hash.slice(1)),
  })
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
  window.addEventListener('hashchange', postHashchangeMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
  window.removeEventListener('hashchange', postHashchangeMessage)
})

// ============================ theme ============================
const { isDark } = useData()

const sendThemeData = () => {
  sendMessage({
    type: 'theme',
    data: isDark.value ? 'dark' : 'light',
  })
}

watch(isDark, () => {
  sendThemeData()
})

// ============================ scale ============================
const scale = ref(1)

const scaleText = computed(() => {
  return Math.round(scale.value * 100) + '%'
})

const onMinus = () => {
  scale.value = Math.max(scale.value - 0.05, 0.5)
}

const onPlus = () => {
  scale.value = Math.min(scale.value + 0.05, 1)
}

// ========================== open window ==========================
const handleOpenNewWindow = (event: MouseEvent) => {
  event.preventDefault()
  sendMessage({
    type: 'getUrl',
  })
}
</script>

<style scoped lang="scss">
/* iPhone 17 机身 */
.iphone {
  position: relative;
  width: 393px;
  height: 852px;
  padding: 12px;
  background: #1a1a1a;
  border-radius: 58px;
  box-shadow:
    /* 外发光 */
    0 0 0 2px rgba(255, 255, 255, 0.08),
    /* 机身厚度 */ 0 0 0 4px #2a2a2a,
    0 0 0 6px rgba(0, 0, 0, 0.3),
    /* 主阴影 */ 0 2px 16px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  transform-origin: top center;
}

/* 钛金属边框 */
.iphone::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 58px;
  padding: 3px;
  background: linear-gradient(
    180deg,
    #4a4a4a 0%,
    #2a2a2a 20%,
    #1a1a1a 50%,
    #2a2a2a 80%,
    #4a4a4a 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 10;
}

/* 边框高光 */
.iphone::after {
  content: '';
  position: absolute;
  top: 3px;
  right: 3px;
  bottom: 3px;
  left: 3px;
  border-radius: 55px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: none;
  z-index: 11;
}

/* 屏幕 */
.screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 48px;
  overflow: hidden;
}

/* 屏幕内边框 */
.screen::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 48px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  pointer-events: none;
  z-index: 100;
}

/* 屏幕内容区域 */
.screen-content {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.toolbar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 54px;
  padding: 0 16px;
  border-radius: 9999px;
  background: rgb(0.139 0.139 0.139);
  margin-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    border: 2px solid rgb(62 62 62);
    border-radius: 9999px;
  }
}

.toolbar-btn-group {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.toolbar-btn {
  color: #c4c4c4;

  &:is(button) {
    width: 50px;
    height: 30px;
    font-size: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    &:first-child {
      border-top-left-radius: 9999px;
      border-bottom-left-radius: 9999px;
    }
    &:last-child {
      border-left: 0;
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
    }
  }
}

.toolbar-scale-text {
  color: #fff;
  font-size: 14px;
  margin-left: 8px;
}

.toolbar-link {
  margin-left: auto;
  color: #fff;
  font-size: 12px;
}
</style>
