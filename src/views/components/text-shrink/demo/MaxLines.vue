<template>
  <!-- 工业语境：安全规程公告｜MaxLines 用法演示 -->
  <s-card>
    <div :class="bem.e('item')">
      <div :class="bem.e('head')">
        <span :class="bem.e('label')">max-lines="2"</span>
        <span :class="bem.e('size')">{{ size2 }}</span>
      </div>
      <div :class="bem.e('notice')">
        <s-text-shrink ref="twoLines" :text="ruleText" :max-lines="2" />
      </div>
    </div>

    <div :class="[bem.e('item'), bem.e('item', 'last')]">
      <div :class="bem.e('head')">
        <span :class="bem.e('label')">max-lines="3"</span>
        <span :class="bem.e('size')">{{ size3 }}</span>
      </div>
      <div :class="bem.e('notice')">
        <s-text-shrink ref="threeLines" :text="ruleText" :max-lines="3" />
      </div>
    </div>
  </s-card>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { createBem } from '@/utils'
import { ruleText } from './shared'

const bem = createBem('text-shrink-demo-lines')

const twoLines = useTemplateRef<{ fontSize?: number }>('twoLines')
const threeLines = useTemplateRef<{ fontSize?: number }>('threeLines')

const toText = (fontSize?: number) => (fontSize ? `${fontSize}px` : '…')

const size2 = computed(() => toText(twoLines.value?.fontSize))
const size3 = computed(() => toText(threeLines.value?.fontSize))
</script>

<style lang="scss" scoped>
@use '@/style/base.scss' as *;

@include b(text-shrink-demo-lines) {
  @include e(item) {
    @include m(last) {
      margin-top: 24px;
    }
  }

  @include e(head) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: var(--s-font-size-sm);
    color: var(--s-text-color-tertiary);
  }

  @include e(label) {
    font-family: var(--s-font-family-code);
  }

  @include e(size) {
    font-variant-numeric: tabular-nums;
  }

  // 公告条：正文长度由运营决定，容器高度必须稳定
  @include e(notice) {
    padding: 10px 12px;
    border-radius: var(--s-border-radius);
    background: var(--s-bg-color-layout);
    font-size: var(--s-font-size);
    line-height: var(--s-line-height-normal);
    color: var(--s-text-color-secondary);
  }
}
</style>
