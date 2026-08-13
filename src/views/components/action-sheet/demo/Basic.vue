<template>
  <s-button @click="visible = true">显示</s-button>
  <s-action-sheet v-model:visible="visible" :item-list="itemList" @select="onSelect" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast, type ActionSheetItemProps } from 'sard'

const visible = ref(false)
const itemList = ref([{ label: '选项1' }, { label: '选项2' }, { label: '选项3' }])

const onSelect = (item: ActionSheetItemProps) => {
  toast(item.label)
}
</script>
