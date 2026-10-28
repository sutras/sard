<template>
  <!-- 工业语境：现场处置动作选择（确认报警 / 转派维修 / 停机）｜Description 用法演示 -->
  <s-button @click="visible = true">显示</s-button>
  <s-action-sheet
    v-model:visible="visible"
    description="联锁验证期间禁止下发工单，验证通过后自动恢复。"
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
  { label: '早班' },
  { label: '中班', description: '批次 1200 件，预计 2 h 完成' },
  { label: '晚班' },
])

const onSelect = (item: ActionSheetItemProps) => {
  toast(item.label)
}
</script>
