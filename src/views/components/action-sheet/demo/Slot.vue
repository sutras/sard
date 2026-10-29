<template>
  <s-button @click="onCustomDescription">显示</s-button>

  <s-action-sheet v-model:visible="visible" @select="onSelect">
    <template #description>
      <div class="flex items-center justify-center">
        <img :src="operatorPortraitPhoto" class="size-8 rounded-full" />
        <span class="ms-2">王海 · 甲班</span>
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
    <s-action-sheet-item label="强制复位" color="var(--s-color-danger)" />
    <s-action-sheet-item label="固件升级" description="仅维护模式下可用" />
    <template #cancel>
      <div class="flex items-center justify-center text-(--s-color-danger)">
        <span class="me-2">取消</span>
        <Close />
      </div>
    </template>
  </s-action-sheet>
</template>

<script setup lang="ts">
import { toast, type ActionSheetItemProps } from 'sard'
import { ref } from 'vue'
import { operatorPortraitPhoto } from '@/data/industrial-images'
import { Close } from '@sard/icons'

const visible = ref(false)

const onCustomDescription = () => {
  visible.value = true
}

const onSelect = (item: ActionSheetItemProps) => {
  toast(item.label)
}
</script>
