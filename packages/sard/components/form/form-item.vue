<template>
  <div ref="form-item" :class="formItemClass">
    <div v-if="slots.label || !isNullish(label)" :class="bem.e('label')" :style="labelStyle">
      <div v-if="shouldShowStar" :class="bem.e('star')">*</div>
      <slot name="label">{{ label }}</slot>
    </div>
    <div :class="contentClass">
      <slot></slot>
      <slot name="validate" :state="validateState"></slot>
      <slot name="error" :message="validateMessage" :show-error="shouldShowError">
        <div v-if="shouldShowError" :class="bem.e('error')">
          {{ validateMessage }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem, isNullish } from '../../utils'
import {
  type FormItemProps,
  type FormItemSlots,
  type FormItemExpose,
  defaultFormItemProps,
} from './common'
import { useFormItem } from './useFormItem'

const props = withDefaults(defineProps<FormItemProps>(), defaultFormItemProps)

const slots = defineSlots<FormItemSlots>()

const bem = createBem('form-item')

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
  contentPosition,
} = useFormItem(props)

defineExpose<FormItemExpose>(expose)

// others

const formItemClass = computed(() => {
  return [
    bem.b(),
    bem.m(direction.value),
    bem.m('inlaid', props.inlaid),
    bem.m(`align-${labelAlign.value}`),
    bem.m(`valign-${labelValign.value}`),
    bem.m(`star-${starPosition.value}`),
  ]
})

const labelStyle = computed(() => {
  return {
    width: direction.value === 'horizontal' ? labelWidth.value : '',
  }
})

const contentClass = computed(() => {
  return [bem.e('content'), bem.em('content', contentPosition.value)]
})
</script>
