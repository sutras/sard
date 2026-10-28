<template>
  <!-- 工业语境：现场处置动作选择（确认报警 / 转派维修 / 停机）｜Imperative 用法演示 -->
  <s-button @click="onClick">显示</s-button>
</template>

<script setup lang="ts">
import { actionSheet, toast } from 'sard'

const onClick = () => {
  actionSheet({
    description: '选择产线',
    itemList: [{ label: '早班' }, { label: '中班' }, { label: '晚班' }],
    showCancel: true,
    onSelect(item) {
      toast(item.label)
    },
  })
}
</script>
