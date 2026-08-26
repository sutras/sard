<template>
  <PopoutInput v-bind="partitionedProps[0]" v-model="inputValue" @clear="onClear" @click="onClick">
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="slots.append" #append>
      <slot name="append"></slot>
    </template>
    <template v-if="slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>
    <PickerPopout
      v-bind="partitionedProps[1]"
      v-model:visible="innerVisible"
      v-model="innerValue"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    >
      <template v-if="slots.option" #option="optionProps">
        <slot name="option" v-bind="optionProps"></slot>
      </template>
    </PickerPopout>
  </PopoutInput>
</template>

<script setup lang="ts" generic="T">
import { watch } from 'vue'
import PopoutInput from '../popout-input/popout-input.vue'
import PickerPopout from '../picker-popout/picker-popout.vue'
import { getIndexesByValue, getOptionsByIndexes } from '../picker/common'
import { isEmptyArray, isEmptyBinding, toArray } from '../../utils'
import { useOptionKeys } from '../../use'
import {
  type PickerInputProps,
  type PickerInputEmits,
  type PickerInputSlots,
  defaultPickerInputProps,
} from './common'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(defineProps<PickerInputProps<T>>(), defaultPickerInputProps)

const slots = defineSlots<PickerInputSlots<T>>()

const emit = defineEmits<PickerInputEmits>()

const optionKeys = useOptionKeys(props)

const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit)

const { getLabel } = optionKeys

const onClick = () => {
  if (props.columns && props.columns.length > 0) {
    show()
  }
}

function getOutletText<T>(columns: T[] | T[][], value: string | number) {
  const indexes = getIndexesByValue(toArray(value), columns || [], optionKeys)
  const options = getOptionsByIndexes(indexes, columns || [], optionKeys)

  const labels = options.map((option) => getLabel(option))

  return labels.join('/')
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)) {
    return ''
  }
  return getOutletText(props.columns, innerValue.value)
}

watch(
  [innerValue, () => props.columns],
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

const onConfirm = (...args: [any, any[], number[]]) => {
  emit('confirm', ...args)
}
</script>
