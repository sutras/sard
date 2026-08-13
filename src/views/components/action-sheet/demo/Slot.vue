<template>
  <s-button @click="onCustomDescription">显示</s-button>

  <s-action-sheet v-model:visible="visible" @select="onSelect">
    <template #description>
      <div class="flex items-center justify-center">
        <img :src="logo" class="size-8" />
        <span class="ms-2">描述内容</span>
      </div>
    </template>
    <s-action-sheet-item label="自定义名称">
      <template #label>
        <span style="color: var(--s-color-primary)">自定义名称</span>
      </template>
      <template #description>
        <span style="color: var(--s-color-primary)">自定义描述</span>
      </template>
    </s-action-sheet-item>
    <s-action-sheet-item label="选项2" color="#ff4d4f" />
    <s-action-sheet-item label="选项3" description="这是描述" />
    <template #cancel>
      <div class="flex items-center justify-center text-(--s-color-danger)">
        <span class="me-2">删除</span>
        <Trash />
      </div>
    </template>
  </s-action-sheet>
</template>

<script setup lang="ts">
import { toast, type ActionSheetItemProps } from 'sard'
import { ref } from 'vue'
import logo from '@/assets/logo.png'
import { Trash } from '@sard/icons'

const visible = ref(false)

const onCustomDescription = () => {
  visible.value = true
}

const onSelect = (item: ActionSheetItemProps) => {
  toast(item.label)
}
</script>
