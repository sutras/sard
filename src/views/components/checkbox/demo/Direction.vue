<template>
  <s-checkbox-group v-model="value" direction="horizontal">
    <s-checkbox value="option1">选项1</s-checkbox>
    <s-checkbox value="option2">选项2</s-checkbox>
    <s-checkbox value="option3">选项3</s-checkbox>
  </s-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['option2'])
</script>
