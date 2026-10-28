<template>
  <!-- 工业语境：设备详情分区（参数 / 报警 / 点检）｜CustomTab 用法演示 -->
  <s-tabs v-model="value" style="--s-tabs-line-bg: transparent">
    <s-tab :value="1">
      <demo-icon name="star" />
      <div class="ms-1">运行参数</div>
    </s-tab>
    <s-tab :value="2">
      <div>报警记录</div>
      <s-badge value="5" />
    </s-tab>
    <s-tab :value="3" label="点检记录"></s-tab>

    <template #line>
      <demo-icon name="smile-line" color="var(--s-color-danger)" size="20px" />
    </template>
  </s-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
