<template>
  <s-marquee style="height: 100px">
    <div
      v-for="(item, i) in data"
      :key="i"
      style="display: flex; justify-content: space-between; margin-bottom: 8px"
    >
      <div>{{ item }}</div>
      <div>06-18</div>
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
