<template>
  <div :class="bem.b()">
    <slot></slot>
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

const bem = createBem('badge-box')
</script>

<style lang="scss">
@use '@/style/base.scss' as *;

@include b(badge-box) {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: var(--s-border-radius);
  background-color: var(--s-fill-color);
}
</style>
