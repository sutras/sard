<template>
  <!-- 工业语境：现场处置动作选择（确认报警 / 转派维修 / 停机）｜Slot 用法演示 -->
  <s-button @click="onCustomDescription">显示</s-button>

  <s-action-sheet v-model:visible="visible" @select="onSelect">
    <template #description>
      <div class="flex items-center justify-center">
        <img :src="logo" class="size-8" />
        <span class="ms-2">自定义描述</span>
      </div>
    </template>
    <s-action-sheet-item label="联锁旁路（需授权）">
      <template #label>
        <span style="color: var(--s-color-primary)">联锁旁路（需授权）</span>
      </template>
      <template #description>
        <span style="color: var(--s-color-primary)">旁路单号 LK-20241027-02</span>
      </template>
    </s-action-sheet-item>
    <s-action-sheet-item label="中班" color="#ff4d4f" />
    <s-action-sheet-item label="晚班" description="仅维护模式下可用" />
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
