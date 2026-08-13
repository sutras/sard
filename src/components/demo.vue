<template>
  <div :class="bem.b()">
    <div v-if="title" :class="bem.e('title')">
      {{ title }}
    </div>
    <div :class="[bem.e('body'), bem.em('body', 'full', full)]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'

withDefaults(
  defineProps<{
    title?: string
    full?: boolean
  }>(),
  {
    full: false,
  },
)

const bem = createBem('demo')
</script>

<style lang="scss">
@use '@/style/base.scss' as *;

@include b(demo) {
  margin-bottom: 40px;

  @include e(title) {
    margin-bottom: 15px;
    margin-inline-start: 16px;
    border-inline-start: 4px solid var(--s-color-primary);
    padding-inline-start: 8px;
    font-size: var(--s-font-size);
    font-weight: bold;
    line-height: var(--s-line-height-tight);
  }

  @include e(body) {
    padding: 0 16px;

    @include m(full) {
      padding-inline-start: 0;
      padding-inline-end: 0;
    }
  }
}
</style>
