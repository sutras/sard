<template>
  <s-card>
    <div v-for="goods in orderGoods" :key="goods" :class="bem.e('group')">
      <div :class="bem.e('case')">
        <span :class="bem.e('label')">默认下限 1px</span>
        <div :class="bem.e('cell')">
          <s-text-shrink :text="goods" />
        </div>
      </div>

      <div :class="bem.e('case')">
        <span :class="bem.e('label', 'limit')">min-font-size: 10</span>
        <div :class="bem.e('cell')">
          <s-text-shrink :text="goods" :min-font-size="10" />
        </div>
      </div>
    </div>

    <p :class="bem.e('tip')">
      订单列表的商品名列宽固定 132px，名称长度由商家填写。默认会一路缩到塞得下为止， 长名称经常缩成
      5px 的灰线；设
      <code>min-font-size="10"</code>
      后，缩到 10px 就不再缩小， 改为省略号 —— 读不清的字不如直接截断。
    </p>
  </s-card>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { orderGoods } from './shared'

const bem = createBem('text-shrink-demo-min-font-size')
</script>

<style lang="scss" scoped>
@use '@/style/base.scss' as *;

@include b(text-shrink-demo-min-font-size) {
  @include e(group) {
    & + & {
      margin-top: 14px;
    }
  }

  @include e(case) {
    display: flex;
    align-items: center;
    gap: 10px;

    & + & {
      margin-top: 6px;
    }
  }

  @include e(label) {
    flex: none;
    width: 118px;
    font-size: 11px;
    font-family: var(--s-font-family-code);
    white-space: nowrap;
    color: var(--s-text-color-tertiary);

    @include m(limit) {
      color: var(--s-color-primary);
    }
  }

  @include e(cell) {
    flex: none;
    width: 132px;
    padding: 4px 6px;
    border-radius: var(--s-border-radius-sm);
    background: var(--s-bg-color-layout);
    font-size: 13px;
    line-height: 1.5;
  }

  @include e(tip) {
    margin: 16px 0 0;
    font-size: var(--s-font-size-sm);
    line-height: var(--s-line-height-normal);
    color: var(--s-text-color-tertiary);

    code {
      padding: 1px 4px;
      border-radius: 3px;
      background: var(--s-bg-color-layout);
      font-family: var(--s-font-family-code);
      font-size: 11px;
    }
  }
}
</style>
