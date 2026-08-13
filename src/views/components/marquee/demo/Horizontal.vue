<template>
  <s-marquee direction="horizontal" :speed="100">
    <div v-for="(item, i) in data" :key="i" style="flex: none; margin-inline-end: 8px">
      <div>{{ item }}</div>
    </div>
  </s-marquee>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const genData = () => {
  return '赵钱孙李周吴郑王'.split('').map((item) => `恭喜${item}**获得丰厚奖品`)
}

const data = ref(genData())
</script>
