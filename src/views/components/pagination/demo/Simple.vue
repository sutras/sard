<template>
  <!-- 工业语境：报警与工单分页｜Simple 用法演示 -->
  <s-pagination :total="43" :page-size="10" type="simple" v-model:current="current" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>
