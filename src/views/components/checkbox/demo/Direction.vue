<template>
  <s-checkbox-group v-model="value" direction="horizontal">
    <s-checkbox value="option1">导轨油位</s-checkbox>
    <s-checkbox value="option2">主轴温度</s-checkbox>
    <s-checkbox value="option3">振动值</s-checkbox>
  </s-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['option2'])
</script>
