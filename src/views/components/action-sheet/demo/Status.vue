<template>
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
  { label: '下发工单' },
  { label: '紧急停机', color: 'var(--s-color-danger)' },
  { label: '报废设备', disabled: true },
  { label: '参数复核', loading: true },
])

const onSelect = (item: ActionSheetItemProps) => {
  toast(item.label)
}
</script>
