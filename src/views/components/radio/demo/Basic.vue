<template>
  <s-radio-group v-model="value" @change="onChange">
    <s-radio value="option1">选项1</s-radio>
    <s-radio value="option2">选项2</s-radio>
  </s-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
