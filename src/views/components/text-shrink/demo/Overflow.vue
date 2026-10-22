<template>
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
        <div :class="bem.e('spec')">{{ row.spec }}</div>
        <div :class="bem.e('result')">{{ row.result }}</div>
      </div>
    </div>

    <p :class="bem.e('tip')">
      中文在 1px 时每个字只占 1px，只有当字数超过容器像素宽度才会真正截断。缩到这个程度已经
      失去可读性，它的作用是「不撑破布局」，而不是「让文字还能看」。
    </p>
  </s-card>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { noticeText } from './shared'

const bem = createBem('text-shrink-demo-overflow')

const rows = [
  {
    spec: '96px · 1 行 · 2 字',
    result: '保持基准字号 12px',
    text: '满减',
    lines: 1,
    width: 96,
  },
  {
    spec: '96px · 1 行 · 12 字',
    result: '缩小字号，完整显示',
    text: '限时特惠全场包邮再送小样',
    lines: 1,
    width: 96,
  },
  {
    spec: '96px · 1 行 · 133 字',
    result: '缩到 1px 仍溢出 → 省略号',
    text: noticeText,
    lines: 1,
    width: 96,
  },
  {
    spec: '96px · 2 行 · 133 字',
    result: '多一行就放得下（约 1.4px）',
    text: noticeText,
    lines: 2,
    width: 96,
  },
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

  // 容器高度交给内容决定，这里只做最低限度的视觉边界
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

  @include e(tip) {
    margin: 16px 0 0;
    font-size: var(--s-font-size-sm);
    line-height: var(--s-line-height-normal);
    color: var(--s-text-color-tertiary);
  }
}
</style>
