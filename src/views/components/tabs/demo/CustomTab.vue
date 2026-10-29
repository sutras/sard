<template>
  <s-tabs v-model="value">
    <s-tab :value="1">
      <demo-icon name="gauge" />
      <div class="ms-1">运行参数</div>
    </s-tab>
    <s-tab :value="2">
      <div>报警记录</div>
      <s-badge value="5" />
    </s-tab>
    <s-tab :value="3" label="点检记录"></s-tab>
  </s-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
