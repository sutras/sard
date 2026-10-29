<template>
  <div class="mx-10">
    <s-slide-verify
      ref="verifyRef"
      text="请按住滑块拖动"
      success-text="验证通过"
      :verify="verify"
    ></s-slide-verify>

    <s-button block variant="link" class="mt-5" @click="onReset">重置验证</s-button>
  </div>
</template>

<script setup lang="ts">
import { sleep, type SlideVerifyExpose, type SlideVerifyResult } from 'sard'
import { ref } from 'vue'

const verify = async ({ actualPos }: SlideVerifyResult) => {
  await sleep(300)

  if (actualPos === 100) {
    return true
  }
  return false
}

const verifyRef = ref<SlideVerifyExpose>()

const onReset = () => {
  verifyRef.value?.reset()
}
</script>
