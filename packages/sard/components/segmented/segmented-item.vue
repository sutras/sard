<template>
  <div :class="segmentedItemClass" @click="onClick">
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createBem } from '../../utils'
import {
  type SegmentedItemProps,
  type SegmentedItemSlots,
  type SegmentedItemEmits,
  type SegmentedItemExpose,
  defaultSegmentedItemProps,
  segmentedContextKey,
} from './common'
import { useFormContext } from '../form'

const props = withDefaults(defineProps<SegmentedItemProps>(), defaultSegmentedItemProps)

defineSlots<SegmentedItemSlots>()

const emit = defineEmits<SegmentedItemEmits>()

const bem = createBem('segmented-item')

const context = inject(segmentedContextKey)

if (!context) {
  throw new Error('SegmentedItem must be included in Segmented.')
}

const formContext = useFormContext()

const isSelected = computed(() => {
  return context.value === props.value
})

const isDisabled = computed(() => {
  return formContext?.disabled || context?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || context?.readonly || props.readonly
})

const onClick = (event: any) => {
  if (!isDisabled.value && !isReadonly.value) {
    context.toggle(props.value)
  }
  emit('click', event)
}

// ============================ style ============================

const segmentedItemClass = computed(() => {
  return [
    bem.b(),
    bem.is('selected', isSelected.value),
    bem.is('disabled', isDisabled.value),
    bem.is('readonly', isReadonly.value),
    bem.m('ellipsis', context.ellipsis),
    bem.m(context.size),
    bem.m(context.shape),
  ]
})

defineExpose<SegmentedItemExpose>({})
</script>
