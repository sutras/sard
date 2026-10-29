<template>
  <s-card>
    <div
      v-for="(row, index) in rows"
      :key="row.result"
      class="flex items-center gap-4"
      :class="index > 0 && 'mt-3.5'"
    >
      <div
        class="min-h-6 shrink-0 rounded bg-(--s-bg-color-layout) px-1.5 py-1 text-sm leading-normal"
        :style="{ width: `${row.width}px` }"
      >
        <s-text-shrink :text="row.text" :max-lines="row.lines" />
      </div>
      <div class="min-w-0">
        <s-text
          tag="div"
          size="small"
          color="tertiary"
          class="[font-family:var(--s-font-family-code)]"
        >
          {{ row.width }}px · {{ row.lines }} 行 · {{ row.text.length }} 字
        </s-text>
        <s-text tag="div" size="small" color="secondary" class="mt-0.5">{{ row.result }}</s-text>
      </div>
    </div>
  </s-card>
</template>

<script setup lang="ts">
import { noticeText } from './shared'

const rows = [
  { result: '12px', text: '报警', lines: 1, width: 96 },
  { result: '缩小后完整', text: '安全门联锁断开待复位', lines: 1, width: 96 },
  { result: '1px 仍溢出 → 省略', text: noticeText, lines: 1, width: 96 },
  { result: '2 行可容纳（约 1.4px）', text: noticeText, lines: 2, width: 96 },
]
</script>
