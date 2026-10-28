<template>
  <!-- 演示工艺参数录入：数值输入配单位后缀，量程写进提示语，避免操作工凭记忆填值 -->
  <s-input
    v-model="value"
    placeholder="设定温度 例 92（量程 −20 ~ 120）"
    aria-label="设定温度，单位摄氏度，量程 0 到 120"
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
