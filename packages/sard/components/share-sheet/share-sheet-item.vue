<template>
  <div :class="[bem.b(), bem.is('disabled', props.disabled)]" @click="onClick">
    <slot name="icon"></slot>
    <div v-if="props.label || slots.label" :class="bem.e('label')">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div v-if="props.description || slots.description" :class="bem.e('description')">
      <slot name="description">{{ props.description }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import {
  type ShareSheetItemProps,
  type ShareSheetItemEmits,
  type ShareSheetItemSlots,
} from './common'
import { useShareSheetItem } from './context'

const props = withDefaults(defineProps<ShareSheetItemProps>(), {
  disabled: false,
})

const slots = defineSlots<ShareSheetItemSlots>()

const emit = defineEmits<ShareSheetItemEmits>()

const bem = createBem('share-sheet-item')

const { select } = useShareSheetItem(props)

const onClick = () => {
  if (!props.disabled) {
    emit('click')
    select()
  }
}
</script>
