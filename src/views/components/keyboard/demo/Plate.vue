<template>
  <!-- 工业语境：工艺参数数字键盘｜Plate 用法演示 -->
  <s-segmented v-model="mode" class="mx-8 mb-5" :options="['chinese', 'english']" />
  <s-keyboard v-model:mode="mode" type="plate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type KeyboardPlateMode } from 'sard'

const mode = ref<KeyboardPlateMode>('chinese')
</script>
