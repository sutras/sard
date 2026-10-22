<template>
  <s-card>
    <div :class="bem.e('group')">
      <div :class="bem.e('caption')">
        普通文本
        <span :class="bem.e('note')">标题超出宽度，只能省略</span>
      </div>
      <div :class="bem.e('coupon')">
        <div :class="bem.e('amount')">
          <span :class="bem.e('symbol')">¥</span>
          <span :class="bem.e('value')">20</span>
        </div>
        <div :class="bem.e('info')">
          <div :class="bem.e('title')">
            <s-ellipsis :content="couponLong" />
          </div>
          <div :class="bem.e('desc')">满 199 可用 · 有效期至 10-31</div>
        </div>
      </div>
    </div>

    <div :class="[bem.e('group'), bem.e('group', 'last')]">
      <div :class="bem.e('caption')">
        TextShrink
        <span :class="bem.e('note')">缩到 {{ sizeText }}，标题完整显示</span>
      </div>
      <div :class="bem.e('coupon')">
        <div :class="bem.e('amount')">
          <span :class="bem.e('symbol')">¥</span>
          <span :class="bem.e('value')">20</span>
        </div>
        <div :class="bem.e('info')">
          <div :class="bem.e('title')">
            <s-text-shrink ref="shrink" :text="couponLong" />
          </div>
          <div :class="bem.e('desc')">满 199 可用 · 有效期至 10-31</div>
        </div>
      </div>
    </div>

    <p :class="bem.e('tip')">
      标题放得下时不会做任何缩放，与上方的普通文本完全一致；只有放不下才缩字号。
    </p>
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

  // 优惠券卡片：这就是组件的真实宿主，宽度完全由布局决定
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
    margin-right: 1px;
    font-size: var(--s-font-size-sm);
  }

  @include e(value) {
    font-size: var(--s-font-size-xl);
    font-variant-numeric: tabular-nums;
  }

  // 标题区只负责撑满剩余宽度，min-width: 0 让它能被压缩
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

  @include e(tip) {
    margin: 16px 0 0;
    font-size: var(--s-font-size-sm);
    line-height: var(--s-line-height-normal);
    color: var(--s-text-color-tertiary);
  }
}
</style>
