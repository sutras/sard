<template>
  <!-- 工业语境：定宽按钮文案｜Dynamic 用法演示 -->
  <s-card>
    <s-segmented v-model="index" :options="localeOptions" />

    <div :class="bem.e('bar')">
      <div :class="bem.e('btn')">{{ current }}</div>
      <div :class="[bem.e('btn'), bem.e('btn', 'primary')]">
        <s-text-shrink ref="shrink" :text="current" />
      </div>
    </div>

    <div :class="bem.e('meta')">96px 宽 · 左：省略 / 右：{{ sizeText }}</div>
  </s-card>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { createBem } from '@/utils'
import { locales } from './shared'

const bem = createBem('text-shrink-demo-dynamic')

const localeOptions = locales.map((item, value) => ({ label: item.label, value }))

const index = ref(0)
const current = computed(() => locales[index.value]?.value ?? '')

const shrink = useTemplateRef<{ fontSize?: number }>('shrink')

const sizeText = computed(() => {
  const fontSize = shrink.value?.fontSize
  return fontSize ? `${fontSize}px` : '…'
})
</script>

<style lang="scss" scoped>
@use '@/style/base.scss' as *;

@include b(text-shrink-demo-dynamic) {
  @include e(bar) {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  // 尺寸写死的操作：文案变长时不能撑大，也不能换行改变操作高度
  @include e(btn) {
    box-sizing: border-box;
    width: 96px;
    height: 40px;
    padding: 0 12px;
    border-radius: var(--s-border-radius-full);
    background: var(--s-bg-color-layout);
    color: var(--s-text-color-primary);
    font-size: 15px;
    line-height: 40px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @include m(primary) {
      background: var(--s-color-primary);
      color: #fff;
    }
  }

  @include e(meta) {
    margin-top: 12px;
    font-size: var(--s-font-size-sm);
    color: var(--s-text-color-tertiary);
    font-variant-numeric: tabular-nums;
  }
}
</style>
