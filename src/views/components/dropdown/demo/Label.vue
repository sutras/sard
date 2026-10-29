<template>
  <s-dropdown>
    <s-dropdown-item label="按报警时间" :options="options1" model-value="1" />
    <s-dropdown-item label="主轴转速" :options="options2" model-value="2" />
  </s-dropdown>
</template>

<script setup lang="ts">
const options1 = [
  {
    label: '本班次',
    value: '1',
  },
  {
    label: '主轴转速优先',
    value: '2',
  },
  {
    label: '评分优先',
    value: '3',
  },
]
const options2 = [
  {
    label: '近 1 小时',
    value: '1',
  },
  {
    label: '近 4 小时',
    value: '2',
  },
  {
    label: '50分钟内',
    value: '3',
  },
]
</script>
