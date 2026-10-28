<template>
  <div class="status-bar">
    <div class="status-left">
      <span>{{ time }}</span>
    </div>
    <div class="dynamic-island">
      <div class="camera"></div>
    </div>
    <div class="status-right">
      <svg
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M128 896 256 896 256 768 128 768M341.333333 896 469.333333 896 469.333333 597.333333 341.333333 597.333333M554.666667 896 682.666667 896 682.666667 384 554.666667 384M768 896 896 896 896 128 768 128 768 896Z"
        ></path>
      </svg>
      <svg
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M214 554c166-164 432-164 596 0L726 640C608 522 416 522 298 640zM384 726c70-70 186-70 256 0l-128 128zM42 384c260-258 682-258 940 0L896 470c-212-212-556-212-768 0z"
        ></path>
      </svg>
      <svg
        style="
          width: 1.2861328125em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1317 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1097.152 292.576l0 438.848-950.848 0 0-438.848 950.848 0zM1170.272 621.728l73.152 0 0-219.424-73.152 0 0-164.576q0-8-5.152-13.152t-13.152-5.152l-1060.576 0q-8 0-13.152 5.152t-5.152 13.152l0 548.576q0 8 5.152 13.152t13.152 5.152l1060.576 0q8 0 13.152-5.152t5.152-13.152l0-164.576zM1316.576 402.272l0 219.424q0 30.272-21.44 51.712t-51.712 21.44l0 91.424q0 37.728-26.848 64.576t-64.576 26.848l-1060.576 0q-37.728 0-64.576-26.848t-26.848-64.576l0-548.576q0-37.728 26.848-64.576t64.576-26.848l1060.576 0q37.728 0 64.576 26.848t26.848 64.576l0 91.424q30.272 0 51.712 21.44t21.44 51.712z"
        ></path>
      </svg>
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
  font-size: 14px;
  font-weight: 600;
  padding-top: 2px;
}

.status-right {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
}

.dynamic-island {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 88px;
  height: 24px;
  background: #000;
  border-radius: 9999px;
}

.camera {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: #1e2230;
  border-radius: 50%;
}
</style>
