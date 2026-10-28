<template>
  <!-- 工业语境：报警与工单分页｜Custom 用法演示 -->
  <s-pagination :total="100" :page-size="10" v-model:current="current">
    <template #prev>
      <Right v-if="isRtl" />
      <Left v-else />
    </template>
    <template #next>
      <Left v-if="isRtl" />
      <Right v-else />
    </template>
  </s-pagination>
</template>

<script setup lang="ts">
import { Left, Right } from '@sard/icons'
import { useRtl } from 'sard'
import { ref } from 'vue'

const isRtl = useRtl()

const current = ref(1)
</script>
