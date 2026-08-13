<template>
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
import { ref } from 'vue'

const src = ref('')

const options = [
  { label: '销毁图片', value: '' },
  {
    label: '加载图片',
    value: 'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg',
  },
]
</script>
