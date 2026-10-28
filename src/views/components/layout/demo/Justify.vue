<template>
  <!-- 工业语境：看板布局｜Justify 用法演示 -->
  <s-row v-for="item in justifyTypes" :justify="item">
    <s-col v-for="i in 3" :span="3">
      <div class="layout-box">{{ item }}</div>
    </s-col>
  </s-row>
</template>

<script setup lang="ts">
const justifyTypes = ['start', 'center', 'end', 'around', 'between', 'evenly'] as const
</script>
