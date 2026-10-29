<template>
  <s-card>
    <div>
      <div class="mb-1.5 flex items-center justify-between">
        <s-text size="small" color="tertiary" class="[font-family:var(--s-font-family-code)]">
          max-lines="2"
        </s-text>
        <s-text size="small" color="tertiary" class="tabular-nums">{{ size2 }}</s-text>
      </div>
      <s-text
        tag="div"
        color="secondary"
        class="rounded-lg bg-(--s-bg-color-layout) px-3.5 py-3 leading-normal"
      >
        <s-text-shrink ref="twoLines" :text="ruleText" :max-lines="2" />
      </s-text>
    </div>

    <div class="mt-7">
      <div class="mb-1.5 flex items-center justify-between">
        <s-text size="small" color="tertiary" class="[font-family:var(--s-font-family-code)]">
          max-lines="3"
        </s-text>
        <s-text size="small" color="tertiary" class="tabular-nums">{{ size3 }}</s-text>
      </div>
      <s-text
        tag="div"
        color="secondary"
        class="rounded-lg bg-(--s-bg-color-layout) px-3.5 py-3 leading-normal"
      >
        <s-text-shrink ref="threeLines" :text="ruleText" :max-lines="3" />
      </s-text>
    </div>
  </s-card>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { ruleText } from './shared'

const twoLines = useTemplateRef<{ fontSize?: number }>('twoLines')
const threeLines = useTemplateRef<{ fontSize?: number }>('threeLines')

const toText = (fontSize?: number) => (fontSize ? `${fontSize}px` : '…')

const size2 = computed(() => toText(twoLines.value?.fontSize))
const size3 = computed(() => toText(threeLines.value?.fontSize))
</script>
