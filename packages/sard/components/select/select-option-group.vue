<template>
  <div :class="bem.b()">
    <div :class="bem.e('label')">
      {{ label }}
    </div>
    <div :class="bem.e('content')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, toRef } from 'vue'
import { createBem } from '../../utils'
import {
  type SelectOptionGroupProps,
  type SelectOptionGroupSlots,
  type SelectOptionGroupEmits,
  type SelectOptionGroupExpose,
  defaultSelectOptionGroupProps,
  selectOptionGroupContextKey,
} from './common'

const props = withDefaults(defineProps<SelectOptionGroupProps>(), defaultSelectOptionGroupProps)

defineSlots<SelectOptionGroupSlots>()

defineEmits<SelectOptionGroupEmits>()

const bem = createBem('select-option-group')

// main
provide(
  selectOptionGroupContextKey,
  reactive({
    disabled: toRef(() => props.disabled),
  }),
)

// others
defineExpose<SelectOptionGroupExpose>({})
</script>
