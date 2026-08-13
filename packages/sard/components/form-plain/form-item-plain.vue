<template>
  <div ref="form-item">
    <slot
      :validate-state="validateState"
      :should-show-star="shouldShowStar"
      :validate-message="validateMessage"
      :should-show-error="shouldShowError"
      :direction="direction"
      :label-align="labelAlign"
      :label-valign="labelValign"
      :star-position="starPosition"
      :label-width="labelWidth"
    ></slot>
  </div>
</template>

<script setup lang="ts">
import { useFormItem } from '../form/useFormItem'
import {
  type FormItemPlainProps,
  type FormItemPlainSlots,
  type FormItemPlainExpose,
} from './common'
import { defaultFormItemProps } from '../form/common'

const props = withDefaults(defineProps<FormItemPlainProps>(), defaultFormItemProps)

defineSlots<FormItemPlainSlots>()
// main

const {
  expose,
  validateState,
  shouldShowStar,
  validateMessage,
  shouldShowError,
  direction,
  labelAlign,
  labelValign,
  starPosition,
  labelWidth,
} = useFormItem(props)

defineExpose<FormItemPlainExpose>(expose)
</script>
