<template>
  <div ref="box" :class="bem.b()">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, useTemplateRef } from 'vue'
import { createBem } from '../../utils'
import {
  type StickyBoxProps,
  type StickyBoxSlots,
  type StickyBoxEmits,
  type StickyBoxExpose,
  stickyContextKey,
} from './common'

withDefaults(defineProps<StickyBoxProps>(), {})

defineSlots<StickyBoxSlots>()

defineEmits<StickyBoxEmits>()

const bem = createBem('sticky-box')

const boxRef = useTemplateRef('box')

provide(stickyContextKey, {
  box: boxRef,
})

defineExpose<StickyBoxExpose>({})
</script>
