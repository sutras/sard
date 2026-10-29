<template>
  <s-stepper placeholder="数量" input-width="52px" v-model="value" @change="onChange" />
  <div>当前值：{{ value ?? '未填写' }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
