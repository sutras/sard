<template>
  <!-- 工业语境：启停与联锁开关｜Text 用法演示 -->
  <s-switch v-model="checked" checked-text="联锁使能" unchecked-text="联锁禁用" />
  <s-switch
    v-model="checked"
    checked-text="联锁使能（需班组长授权）"
    unchecked-text="联锁禁用"
    class="ms-2"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
