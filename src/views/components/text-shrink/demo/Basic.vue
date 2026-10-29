<template>
  <s-card>
    <div>
      <div class="mb-2">
        <s-text size="small" tag="strong">普通文本</s-text>
        <s-text size="small" color="tertiary" class="ml-2">超出即省略</s-text>
      </div>
      <div
        class="flex items-center gap-3.5 rounded-xl bg-(--s-bg-color-layout) px-3.5 py-3 text-[17px] leading-snug"
      >
        <div
          class="flex h-[64px] w-[64px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg bg-(--s-bg-color-container) font-semibold text-(--s-color-primary)"
        >
          <span class="text-[10px] tracking-[0.06em] opacity-75">OEE</span>
          <span class="text-[16px] tabular-nums">87.3</span>
        </div>
        <div class="min-w-0 flex-1">
          <div class="font-semibold">
            <s-ellipsis :content="couponLong" />
          </div>
          <s-text tag="div" size="small" color="tertiary" class="mt-0.5">机加工一线 · ST-04</s-text>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <div class="mb-2">
        <s-text size="small" tag="strong">TextShrink</s-text>
        <s-text size="small" color="tertiary" class="ml-2">缩到 {{ sizeText }} 完整显示</s-text>
      </div>
      <div
        class="flex items-center gap-3.5 rounded-xl bg-(--s-bg-color-layout) px-3.5 py-3 text-[17px] leading-snug"
      >
        <div
          class="flex h-[64px] w-[64px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg bg-(--s-bg-color-container) font-semibold text-(--s-color-primary)"
        >
          <span class="text-[10px] tracking-[0.06em] opacity-75">OEE</span>
          <span class="text-[16px] tabular-nums">87.3</span>
        </div>
        <div class="min-w-0 flex-1">
          <div class="font-semibold">
            <s-text-shrink ref="shrink" :text="couponLong" />
          </div>
          <s-text tag="div" size="small" color="tertiary" class="mt-0.5">机加工一线 · ST-04</s-text>
        </div>
      </div>
    </div>
  </s-card>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { couponLong } from './shared'

const shrink = useTemplateRef<{ fontSize?: number }>('shrink')

const sizeText = computed(() => {
  const fontSize = shrink.value?.fontSize
  return fontSize ? `${fontSize}px` : '…'
})
</script>
