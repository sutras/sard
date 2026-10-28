<template>
  <!-- 工业语境：设备与报警现场图片｜Fade 用法演示 -->
  <s-segmented v-model="src" :options="options" />

  <div style="height: 160px; margin-top: 10px">
    <s-image v-if="src" :src="src" width="160px" height="160px"></s-image>

    <s-image
      v-if="src"
      :src="src"
      width="160px"
      height="160px"
      class="ms-2"
      :fade="false"
    ></s-image>
  </div>
</template>

<script setup lang="ts">
import { cncLathePhoto } from '@/data/industrial-images'
import { ref } from 'vue'

const src = ref('')

const options = [
  { label: '销毁图片', value: '' },
  {
    label: '加载图片',
    value: cncLathePhoto,
  },
]
</script>
