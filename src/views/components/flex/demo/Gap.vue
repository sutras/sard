<template>
  <!-- 工业语境：看板栅格排布｜Gap 用法演示 -->
  <s-flex vertical gap="large">
    <s-radio-group v-model="gap" direction="horizontal" :options="flexGap" />

    <s-flex :gap="gap">
      <s-button>下发工单</s-button>
      <s-button>下发工单</s-button>
      <s-button>下发工单</s-button>
    </s-flex>
  </s-flex>
</template>

<script setup lang="ts">
import { flexGap, type FlexGap } from 'sard'
import { ref } from 'vue'

const gap = ref<FlexGap>('medium')
</script>
