<template>
  <!-- 工业语境：设备位号与批次号检索｜Basic 用法演示 -->
  <s-search
    v-model="value"
    placeholder="输入设备位号 / 批次号"
    @input="onInput"
    @change="onChange"
    @search="onSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard'

const value = ref('')

const onInput = (value: any) => {
  console.log('input', value)
}

const onChange = (value: any) => {
  console.log('change', value)
}

const onSearch = (keyword: string) => {
  toast(keyword ? `按「${keyword}」检索设备台账` : '未输入关键字，显示全部在线设备')
}
</script>
