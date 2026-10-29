<template>
  <s-card>
    <s-segmented v-model="index" :options="localeOptions" />

    <div class="mt-4.5 flex gap-3">
      <div
        class="box-border h-[40px] w-[96px] overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-(--s-bg-color-layout) px-3.5 text-center text-[15px] leading-[40px] text-(--s-text-color-primary)"
      >
        {{ current }}
      </div>
      <div
        class="box-border h-[40px] w-[96px] overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-(--s-color-primary) px-3.5 text-center text-[15px] leading-[40px] text-white"
      >
        <s-text-shrink ref="shrink" :text="current" />
      </div>
    </div>

    <s-text tag="div" size="small" color="tertiary" class="mt-3.5 tabular-nums">
      96px 宽 · 左：省略 / 右：{{ sizeText }}
    </s-text>
  </s-card>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { locales } from './shared'

const localeOptions = locales.map((item, value) => ({ label: item.label, value }))

const index = ref(0)
const current = computed(() => locales[index.value]?.value ?? '')

const shrink = useTemplateRef<{ fontSize?: number }>('shrink')

const sizeText = computed(() => {
  const fontSize = shrink.value?.fontSize
  return fontSize ? `${fontSize}px` : '…'
})
</script>
