<template>
  <!-- 工业语境：参数连续调节（转速 / 温度）｜Range 用法演示 -->
  <s-slider v-model="value" range />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([20, 80])
</script>
