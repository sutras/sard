<template>
  <!-- 工业语境：设备卡片副标题｜BaseFontSize 用法演示 -->
  <s-card>
    <div :class="bem.e('item')">
      <div :class="bem.e('head')">
        <span :class="bem.e('label')">不指定 base-font-size</span>
        <span :class="bem.e('size')">{{ sizeInherit }}</span>
      </div>
      <div :class="bem.e('member')">
        <div :class="bem.e('row')">
          <span :class="bem.e('name')">CNC-Lathe-01</span>
          <span :class="bem.e('level')">早班</span>
        </div>
        <div :class="bem.e('subtitle')">
          <s-text-shrink ref="inherit" :text="memberSubtitle" />
        </div>
      </div>
      <div :class="bem.e('desc')">未指定：跟随容器 26px</div>
    </div>

    <div :class="[bem.e('item'), bem.e('item', 'last')]">
      <div :class="bem.e('head')">
        <span :class="bem.e('label')">base-font-size="12"</span>
        <span :class="bem.e('size')">{{ sizeFixed }}</span>
      </div>
      <div :class="bem.e('member')">
        <div :class="bem.e('row')">
          <span :class="bem.e('name')">CNC-Lathe-01</span>
          <span :class="bem.e('level')">早班</span>
        </div>
        <div :class="bem.e('subtitle')">
          <s-text-shrink ref="fixed" :text="memberSubtitle" :base-font-size="12" />
        </div>
      </div>
      <div :class="bem.e('desc')">指定 12px：副标题独立</div>
    </div>
  </s-card>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { createBem } from '@/utils'
import { memberSubtitle } from './shared'

const bem = createBem('text-shrink-demo-base')

const inherit = useTemplateRef<{ fontSize?: number }>('inherit')
const fixed = useTemplateRef<{ fontSize?: number }>('fixed')

const toText = (fontSize?: number) => (fontSize ? `${fontSize}px` : '…')

const sizeInherit = computed(() => toText(inherit.value?.fontSize))
const sizeFixed = computed(() => toText(fixed.value?.fontSize))
</script>

<style lang="scss" scoped>
@use '@/style/base.scss' as *;

@include b(text-shrink-demo-base) {
  @include e(item) {
    @include m(last) {
      margin-top: 28px;
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

  // 操作员卡：容器字号 26px 是给称号用的，副设备参数只是同一个容器里的另一段文字
  @include e(member) {
    padding: 16px;
    border-radius: var(--s-border-radius-xl);
    background: linear-gradient(135deg, #2f3037, #4b4c57);
    color: #fff;
    font-size: 26px;
    line-height: var(--s-line-height-tight);
  }

  @include e(row) {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  @include e(name) {
    font-weight: var(--s-font-weight-bold);
    letter-spacing: 1px;
  }

  @include e(level) {
    font-variant-numeric: tabular-nums;
    opacity: 0.6;
  }

  @include e(subtitle) {
    margin-top: 6px;
    color: rgba(255, 255, 255, 0.72);
  }

  @include e(desc) {
    margin-top: 8px;
    font-size: var(--s-font-size-sm);
    line-height: var(--s-line-height-normal);
    color: var(--s-text-color-tertiary);
  }
}
</style>
