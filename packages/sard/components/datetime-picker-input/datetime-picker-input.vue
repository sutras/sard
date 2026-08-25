<template>
  <PopoutInput v-bind="partitionedProps[0]" v-model="inputValue" @clear="onClear" @click="show">
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="slots.append" #append>
      <slot name="append"></slot>
    </template>
    <template v-if="slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>
    <DatetimePickerPopout
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
import DatetimePickerPopout from '../datetime-picker-popout/datetime-picker-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import {
  type DatetimePickerInputProps,
  type DatetimePickerInputSlots,
  type DatetimePickerInputEmits,
  defaultDatetimePickerInputProps,
  mapTypeFormat,
} from './common'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(defineProps<DatetimePickerInputProps>(), defaultDatetimePickerInputProps)

const slots = defineSlots<DatetimePickerInputSlots>()

const emit = defineEmits<DatetimePickerInputEmits>()

const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit)

function getOutletText(value: Date | string) {
  if (isString(value) && props.valueFormat) {
    value = parseDate(value, props.valueFormat)
  }
  if (value instanceof Date) {
    return formatDate(
      value,
      props.outletFormat || mapTypeFormat[props.type as keyof typeof mapTypeFormat],
    )
  }
  return value
}

function getInputValue() {
  if (!innerValue.value) {
    return ''
  }
  return getOutletText(innerValue.value)
}

watch(
  innerValue,
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

const onConfirm = () => {
  emit('confirm')
}
</script>
