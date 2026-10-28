<template>
  <!-- 工业语境：参数连续调节（转速 / 温度）｜Basic 用法演示 -->
  <s-slider v-model="value" @input="onInput" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)

const onInput = (value: any) => {
  console.log('input', value)
}

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
