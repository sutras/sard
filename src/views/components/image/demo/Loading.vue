<template>
  <s-segmented v-model="src" :options="options" />

  <div style="height: 160px; margin-top: 10px">
    <s-image v-if="src" :src="src" width="160px" height="160px" :custom-load="customLoad"></s-image>
    <s-image
      v-if="src"
      :src="src"
      width="160px"
      height="160px"
      class="ms-2"
      :custom-load="customLoad"
    >
      <template #loading>
        <span class="text-sm">加载中...</span>
      </template>
    </s-image>
  </div>
</template>

<script setup lang="ts">
import { sleep } from 'sard'
import { ref } from 'vue'

const src = ref('')

const options = [
  { label: '销毁图片', value: '' },
  {
    label: '加载图片',
    value: 'https://fastly.jsdelivr.net/npm/@sard/assets/images/tiger1.jpg',
  },
]

const customLoad = async (callback: any) => {
  await sleep(1000)
  callback()
}
</script>
