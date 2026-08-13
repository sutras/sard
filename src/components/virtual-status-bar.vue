<template>
  <div class="status-bar">
    <div class="status-left">
      <span>{{ time }}</span>
    </div>
    <div class="dynamic-island"></div>
    <div class="status-right">
      <demo-icon name="signal" class="-me-1 -mt-1.5" />
      <demo-icon name="wifi" />
      <demo-icon name="battery-half" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('9:41')
let timer: ReturnType<typeof setInterval> | null = null

const updateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.status-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2147483647;
  display: flex;
  justify-content: space-between;
  height: var(--s-status-bar-height);
  padding: 0 24px;
  pointer-events: none;
  --color: var(--s-text-color-emphasis);
}

.status-left {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color);
  font-size: 15px;
  font-weight: 600;
  padding-top: 2px;
}

.status-right {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
}

.dynamic-island {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 126px;
  height: 36px;
  background: #000;
  border-radius: 9999px;
}
</style>
