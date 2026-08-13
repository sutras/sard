<template>
  <s-marquee style="height: 100px">
    <div
      v-for="(item, i) in list"
      :key="i"
      style="display: flex; justify-content: space-between; margin-bottom: 8px"
    >
      <div>{{ item }}</div>
      <div>06-18</div>
    </div>
  </s-marquee>

  <s-slider v-model="count" :min="0" :max="10" show-scale class="mt-6" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const count = ref(5)

const list = computed(() => {
  return Array(count.value)
    .fill(0)
    .map((_, i) => {
      return `[${i + 1}] 获得丰厚奖品`
    })
})
</script>
