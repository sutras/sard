<template>
  <!-- 工业语境：设备参数卡｜Basic 用法演示 -->
  <s-card>
    <div :class="bem.e('group')">
      <div :class="bem.e('caption')">
        普通文本
        <span :class="bem.e('note')">超出即省略</span>
      </div>
      <div :class="bem.e('coupon')">
        <div :class="bem.e('amount')">
          <span :class="bem.e('symbol')">OEE</span>
          <span :class="bem.e('value')">87.3</span>
        </div>
        <div :class="bem.e('info')">
          <div :class="bem.e('title')">
            <s-ellipsis :content="couponLong" />
          </div>
          <div :class="bem.e('desc')">机加工一线 · ST-04</div>
        </div>
      </div>
    </div>

    <div :class="[bem.e('group'), bem.e('group', 'last')]">
      <div :class="bem.e('caption')">
        TextShrink
        <span :class="bem.e('note')">缩到 {{ sizeText }} 完整显示</span>
      </div>
      <div :class="bem.e('coupon')">
        <div :class="bem.e('amount')">
          <span :class="bem.e('symbol')">OEE</span>
          <span :class="bem.e('value')">87.3</span>
        </div>
        <div :class="bem.e('info')">
          <div :class="bem.e('title')">
            <s-text-shrink ref="shrink" :text="couponLong" />
          </div>
          <div :class="bem.e('desc')">机加工一线 · ST-04</div>
        </div>
      </div>
    </div>
  </s-card>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { createBem } from '@/utils'
import { couponLong } from './shared'

const bem = createBem('text-shrink-demo-basic')

const shrink = useTemplateRef<{ fontSize?: number }>('shrink')

const sizeText = computed(() => {
  const fontSize = shrink.value?.fontSize
  return fontSize ? `${fontSize}px` : '…'
})
</script>

<style lang="scss" scoped>
@use '@/style/base.scss' as *;

@include b(text-shrink-demo-basic) {
  @include e(group) {
    @include m(last) {
      margin-top: 20px;
    }
  }

  @include e(caption) {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
    font-size: var(--s-font-size-sm);
    font-weight: var(--s-font-weight-bold);
    color: var(--s-text-color-primary);
  }

  @include e(note) {
    font-weight: var(--s-font-weight-normal);
    color: var(--s-text-color-tertiary);
  }

  // 工艺文件卡片：这就是组件的真实宿主，宽度完全由布局决定
  @include e(coupon) {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: var(--s-border-radius-lg);
    background: var(--s-bg-color-layout);
    font-size: 17px;
    line-height: 1.4;
  }

  @include e(amount) {
    display: flex;
    flex: none;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: var(--s-border-radius);
    background: var(--s-bg-color-container);
    color: var(--s-color-primary);
    font-weight: var(--s-font-weight-bold);
  }

  @include e(symbol) {
    font-size: 10px;
    letter-spacing: 0.06em;
    opacity: 0.75;
  }

  @include e(value) {
    font-size: var(--s-font-size-lg);
    font-variant-numeric: tabular-nums;
  }

  // 设备参数区只负责撑满剩余宽度，min-width: 0 让它能被压缩
  @include e(info) {
    min-width: 0;
    flex: 1;
  }

  @include e(title) {
    font-weight: var(--s-font-weight-bold);
  }

  @include e(desc) {
    margin-top: 2px;
    font-size: var(--s-font-size-sm);
    color: var(--s-text-color-tertiary);
  }
}
</style>
