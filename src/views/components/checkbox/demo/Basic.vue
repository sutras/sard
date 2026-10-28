<template>
  <!-- 工业语境：点检项与安全前置勾选｜Basic 用法演示 -->
  <s-checkbox v-model:checked="checked" @change="onChange">
    {{ checked ? '已选中' : '未选中' }}
  </s-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
