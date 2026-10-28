<template>
  <!-- 工业语境：启停与联锁开关｜Loading 用法演示 -->
  <s-switch
    v-model="checked"
    :before-update="beforeUpdate"
    aria-label="停机申请开关，等待 MES 回执"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)

const beforeUpdate = (value: boolean) => {
  console.log(value)
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}
</script>
