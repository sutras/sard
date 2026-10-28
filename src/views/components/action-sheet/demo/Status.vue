<template>
  <!-- 工业语境：现场处置动作选择（确认报警 / 转派维修 / 停机）｜Status 用法演示 -->
  <s-button @click="visible = true">显示</s-button>
  <s-action-sheet
    v-model:visible="visible"
    cancel="取消"
    :item-list="itemList"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast, type ActionSheetItemProps } from 'sard'

const visible = ref(false)
const itemList = ref([
  { label: '早班', color: 'var(--s-color-danger)' },
  { label: '中班', disabled: true },
  { label: '晚班', loading: true },
])

const onSelect = (item: ActionSheetItemProps) => {
  toast(item.label)
}
</script>
