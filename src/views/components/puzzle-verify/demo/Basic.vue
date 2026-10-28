<template>
  <!-- 工业语境：受控操作人机校验｜Basic 用法演示 -->
  <div class="mx-10">
    <s-puzzle-verify
      ref="verifyRef"
      text="请按住滑块拖动"
      success-text="验证通过"
      :src="src"
      :target-pos="targetPos"
      :verify="verify"
      :aspect-ratio="320 / 219"
    ></s-puzzle-verify>

    <s-button block variant="link" class="mt-5" @click="onReset">重置验证</s-button>
    <s-button block variant="link" class="mt-3" @click="onUpdate">更新</s-button>
  </div>
</template>

<script setup lang="ts">
import { photoAt } from '@/data/industrial-images'
import { random, sleep, type SlideVerifyExpose, type SlideVerifyResult } from 'sard'
import { ref } from 'vue'

const targetPos = ref(random(30, 80))
const src = ref('')

const verify = async ({ actualPos, targetPos }: SlideVerifyResult) => {
  await sleep(100)

  const errorValue = 3
  if (actualPos >= targetPos - errorValue && actualPos <= targetPos + errorValue) {
    return true
  }
  return false
}

const verifyRef = ref<SlideVerifyExpose>()

const onReset = () => {
  verifyRef.value?.reset()
  targetPos.value = random(30, 80)
}

let i = 0
function update() {
  src.value = photoAt(++i).url
}
update()

const onUpdate = () => {
  update()
  onReset()
}
</script>
