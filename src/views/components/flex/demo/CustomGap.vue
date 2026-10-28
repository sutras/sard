<template>
  <!-- 工业语境：看板栅格排布｜CustomGap 用法演示 -->
  <s-flex vertical gap="large">
    <s-slider v-model="gap" :min="0" :max="80" show-value />

    <s-flex :gap="gap + 'px'">
      <s-button>下发工单</s-button>
      <s-button>下发工单</s-button>
      <s-button>下发工单</s-button>
    </s-flex>
  </s-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const gap = ref(10)
</script>
