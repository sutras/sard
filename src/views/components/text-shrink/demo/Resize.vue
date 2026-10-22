<template>
  <s-card>
    <s-segmented v-model="columns" :options="columnOptions" />

    <div :class="bem.e('grid')" :style="{ '--columns': columns }">
      <div v-for="(name, index) in goodsList" :key="name" :class="bem.e('cell')">
        <div :class="bem.e('thumb')"></div>
        <div :class="bem.e('name')">
          <s-text-shrink v-if="index === 0" ref="first" :text="name" :max-lines="2" />
          <s-text-shrink v-else :text="name" :max-lines="2" />
        </div>
      </div>
    </div>

    <div :class="bem.e('meta')">{{ columns }} 列 · 标题上限 13px · 当前 {{ sizeText }}</div>
  </s-card>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { createBem } from '@/utils'
import { goodsList } from './shared'

const bem = createBem('text-shrink-demo-resize')

const columnOptions = [
  { label: '2 列', value: 2 },
  { label: '3 列', value: 3 },
]

const columns = ref(2)

const first = useTemplateRef<Array<{ fontSize?: number }>>('first')

const sizeText = computed(() => {
  const fontSize = first.value?.[0]?.fontSize
  return fontSize ? `${fontSize}px` : '…'
})
</script>

<style lang="scss" scoped>
@use '@/style/base.scss' as *;

@include b(text-shrink-demo-resize) {
  @include e(grid) {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 8px;
    margin-top: 12px;
  }

  // 卡片宽度由网格决定，切列数时骤减，这就是 ResizeObserver 的真实触发源
  @include e(cell) {
    min-width: 0;
    font-size: 13px;
    line-height: 1.4;
  }

  @include e(thumb) {
    aspect-ratio: 1;
    border-radius: var(--s-border-radius);
    background: linear-gradient(135deg, var(--s-fill-color-secondary), var(--s-fill-color));
  }

  @include e(name) {
    margin-top: 6px;
    color: var(--s-text-color-primary);
  }

  @include e(meta) {
    margin-top: 12px;
    font-size: var(--s-font-size-sm);
    color: var(--s-text-color-tertiary);
    font-variant-numeric: tabular-nums;
  }
}
</style>
