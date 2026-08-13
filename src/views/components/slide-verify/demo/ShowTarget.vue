<template>
  <div class="mx-10">
    <s-slide-verify
      ref="verifyRef"
      text="拖动滑块至虚线框内"
      success-text="验证通过"
      show-target
      :target-pos="targetPos"
      :verify="verify"
    ></s-slide-verify>

    <s-button block variant="link" class="mt-5" @click="onReset">重置验证</s-button>
  </div>
</template>

<script setup lang="ts">
import { random, sleep, type SlideVerifyExpose, type SlideVerifyResult } from 'sard'
import { ref } from 'vue'

const targetPos = ref(random(50, 100))

const verify = async ({ targetPos, actualPos }: SlideVerifyResult) => {
  await sleep(300)

  const errorValue = 2
  if (actualPos >= targetPos - errorValue && actualPos <= targetPos + errorValue) {
    return true
  }
  return false
}

const verifyRef = ref<SlideVerifyExpose>()

const onReset = () => {
  verifyRef.value?.reset()
  targetPos.value = random(50, 100)
}
</script>
