<template>
  <!-- 工业语境：定宽单元格的缩放下限｜Overflow 用法演示 -->
  <s-card>
    <div
      v-for="(row, index) in rows"
      :key="row.spec"
      :class="[bem.e('row'), index > 0 && bem.e('row', 'gap')]"
    >
      <div :class="bem.e('box')" :style="{ width: `${row.width}px` }">
        <s-text-shrink :text="row.text" :max-lines="row.lines" />
      </div>
      <div :class="bem.e('info')">
        <div :class="bem.e('spec')">
          {{ row.width }}px · {{ row.lines }} 行 · {{ row.text.length }} 字
        </div>
        <div :class="bem.e('result')">{{ row.result }}</div>
      </div>
    </div>
  </s-card>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { noticeText } from './shared'

const bem = createBem('text-shrink-demo-overflow')

const rows = [
  { result: '12px', text: '报警', lines: 1, width: 96 },
  { result: '缩小后完整', text: '安全门联锁断开待复位', lines: 1, width: 96 },
  { result: '1px 仍溢出 → 省略', text: noticeText, lines: 1, width: 96 },
  { result: '2 行可容纳（约 1.4px）', text: noticeText, lines: 2, width: 96 },
]
</script>

<style lang="scss" scoped>
@use '@/style/base.scss' as *;

@include b(text-shrink-demo-overflow) {
  @include e(row) {
    display: flex;
    align-items: center;
    gap: 14px;

    @include m(gap) {
      margin-top: 12px;
    }
  }

  // 容器高度交给参数明细决定，这里只做最低限度的视觉边界
  @include e(box) {
    flex: none;
    min-height: 22px;
    padding: 4px 6px;
    border-radius: var(--s-border-radius-sm);
    background: var(--s-bg-color-layout);
    font-size: 12px;
    line-height: 1.5;
  }

  @include e(info) {
    min-width: 0;
  }

  @include e(spec) {
    font-size: var(--s-font-size-sm);
    font-family: var(--s-font-family-code);
    color: var(--s-text-color-tertiary);
  }

  @include e(result) {
    margin-top: 2px;
    font-size: var(--s-font-size-sm);
    color: var(--s-text-color-secondary);
  }
}
</style>
