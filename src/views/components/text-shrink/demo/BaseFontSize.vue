<template>
  <s-card>
    <div>
      <div class="mb-1.5 flex items-center justify-between">
        <s-text size="small" color="tertiary" class="[font-family:var(--s-font-family-code)]">
          不指定 base-font-size
        </s-text>
        <s-text size="small" color="tertiary" class="tabular-nums">{{ sizeInherit }}</s-text>
      </div>
      <div
        class="rounded-2xl bg-[linear-gradient(135deg,#2f3037,#4b4c57)] p-4.5 text-[26px] leading-tight text-white"
      >
        <div class="flex items-baseline justify-between">
          <span class="font-semibold tracking-[1px]">CNC-Lathe-01</span>
          <span class="tabular-nums opacity-60">早班</span>
        </div>
        <div class="mt-1.5 text-white/72">
          <s-text-shrink ref="inherit" :text="memberSubtitle" />
        </div>
      </div>
      <s-text tag="div" size="small" color="tertiary" class="mt-2 leading-normal">
        未指定：跟随容器 26px
      </s-text>
    </div>

    <div class="mt-8">
      <div class="mb-1.5 flex items-center justify-between">
        <s-text size="small" color="tertiary" class="[font-family:var(--s-font-family-code)]">
          base-font-size="12"
        </s-text>
        <s-text size="small" color="tertiary" class="tabular-nums">{{ sizeFixed }}</s-text>
      </div>
      <div
        class="rounded-2xl bg-[linear-gradient(135deg,#2f3037,#4b4c57)] p-4.5 text-[26px] leading-tight text-white"
      >
        <div class="flex items-baseline justify-between">
          <span class="font-semibold tracking-[1px]">CNC-Lathe-01</span>
          <span class="tabular-nums opacity-60">早班</span>
        </div>
        <div class="mt-1.5 text-white/72">
          <s-text-shrink ref="fixed" :text="memberSubtitle" :base-font-size="12" />
        </div>
      </div>
      <s-text tag="div" size="small" color="tertiary" class="mt-2 leading-normal">
        指定 12px：副标题独立
      </s-text>
    </div>
  </s-card>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { memberSubtitle } from './shared'

const inherit = useTemplateRef<{ fontSize?: number }>('inherit')
const fixed = useTemplateRef<{ fontSize?: number }>('fixed')

const toText = (fontSize?: number) => (fontSize ? `${fontSize}px` : '…')

const sizeInherit = computed(() => toText(inherit.value?.fontSize))
const sizeFixed = computed(() => toText(fixed.value?.fontSize))
</script>
