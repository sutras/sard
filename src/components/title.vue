<template>
  <div :class="bem.b()">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'

const bem = createBem('title')
</script>

<style lang="scss">
@use '@/style/base.scss' as *;

@include b(title) {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: var(--s-font-size);
  color: var(--s-text-color-tertiary);

  &:first-child {
    margin-top: 0;
  }
}
</style>
