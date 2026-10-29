<template>
  <s-radio-group v-model="value" checked-color="var(--s-color-danger)">
    <s-radio value="option1">急停触发</s-radio>
    <s-radio value="option2">联锁断开</s-radio>
  </s-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
</script>
