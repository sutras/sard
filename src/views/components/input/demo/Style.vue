<template>
  <!-- 工业语境：输入框样式定制（车间大屏高对比度） -->
  <div style="padding: 5px 10px; background: var(--s-gray-400)">
    <s-input
      v-model="value"
      placeholder="输入设备位号 / 批次号"
      placeholder-style="color: rgba(0,0,0,.3)"
      borderless
      style="
        height: 40px;
        border-radius: 9999px;
        background-color: #fff;
        text-align: center;
        color: #000;
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
