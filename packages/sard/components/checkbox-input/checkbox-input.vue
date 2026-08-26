<template>
  <PopoutInput
    v-bind="partitionedProps[0]"
    v-model="inputValue"
    multiline
    @clear="onClear"
    @click="show"
  >
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="slots.append" #append>
      <slot name="append"></slot>
    </template>
    <template v-if="slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>
    <CheckboxPopout
      v-bind="partitionedProps[1]"
      v-model:visible="innerVisible"
      v-model="innerValue"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    />
  </PopoutInput>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import PopoutInput from '../popout-input/popout-input.vue'
import CheckboxPopout from '../checkbox-popout/checkbox-popout.vue'
import {
  type CheckboxInputProps,
  type CheckboxInputEmits,
  type CheckboxInputOption,
  type CheckboxInputSlots,
  defaultCheckboxInputProps,
} from './common'
import { isEmptyArray, isEmptyBinding } from '../../utils'
import { useOptionKeys } from '../../use'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(defineProps<CheckboxInputProps>(), defaultCheckboxInputProps)

const slots = defineSlots<CheckboxInputSlots>()

const emit = defineEmits<CheckboxInputEmits>()

const { getLabel, getValue } = useOptionKeys(props)

const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit)

function getOutletText(options: CheckboxInputOption[], value: any[]) {
  return options
    .filter((option) => value.includes(getValue(option)))
    .map((option) => getLabel(option))
    .join(', ')
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)) {
    return ''
  }
  return getOutletText(props.options, innerValue.value)
}

watch(
  [innerValue, () => props.options],
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

const onConfirm = (value: any) => {
  emit('confirm', value)
}
</script>
