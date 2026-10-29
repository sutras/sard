<template>
  <s-input
    v-model="value"
    placeholder="设定温度 例 92（量程 −20 ~ 120）"
    data-param="set-temperature"
    data-unit="°C"
    data-min="0"
    data-max="120"
    @input="onInput"
    @change="onChange"
  >
    <template #append>
      <span>°C</span>
    </template>
  </s-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const onInput = (value: any) => {
  console.log('参数输入中', value)
}

const onChange = (value: any) => {
  console.log('参数确认', value)
}
</script>
