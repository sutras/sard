<template>
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
