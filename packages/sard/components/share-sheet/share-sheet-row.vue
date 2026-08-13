<template>
  <div :class="bem.b()">
    <div :class="bem.e('scroll')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import {
  type ShareSheetRowProps,
  type ShareSheetRowSlots,
  type ShareSheetRowEmits,
  type ShareSheetRowExpose,
  defaultShareSheetRowProps,
} from './common'

withDefaults(defineProps<ShareSheetRowProps>(), defaultShareSheetRowProps)

defineSlots<ShareSheetRowSlots>()

defineEmits<ShareSheetRowEmits>()

const bem = createBem('share-sheet-row')

defineExpose<ShareSheetRowExpose>({})
</script>
