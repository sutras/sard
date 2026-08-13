<template>
  <s-accordion v-model="value">
    <s-accordion-item title="标题1" name="1" extra="额外内容">内容1</s-accordion-item>
    <s-accordion-item title="标题2" name="2">内容2</s-accordion-item>
    <s-accordion-item title="标题3" name="3">内容3</s-accordion-item>
  </s-accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>
