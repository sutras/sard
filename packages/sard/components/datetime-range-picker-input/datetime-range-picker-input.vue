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
    <DatetimeRangePickerPopout
      v-bind="partitionedProps[1]"
      v-model:visible="innerVisible"
      v-model="innerValue"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    >
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </DatetimeRangePickerPopout>
  </PopoutInput>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import PopoutInput from '../popout-input/popout-input.vue'
import DatetimeRangePickerPopout from '../datetime-range-picker-popout/datetime-range-picker-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import {
  type DatetimeRangePickerInputProps,
  type DatetimeRangePickerInputSlots,
  type DatetimeRangePickerInputEmits,
  defaultDatetimeRangePickerInputProps,
} from './common'
import { mapTypeFormat } from '../datetime-picker-input/common'
import { useTranslateWithPrefix } from '../../locale'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(
  defineProps<DatetimeRangePickerInputProps>(),
  defaultDatetimeRangePickerInputProps,
)

const slots = defineSlots<DatetimeRangePickerInputSlots>()

const emit = defineEmits<DatetimeRangePickerInputEmits>()

const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit)

const { t } = useTranslateWithPrefix('datetimeRangePickerInput')

function getOutletTextMayByStr(date: string | Date) {
  if (isString(date) && props.valueFormat) {
    date = parseDate(date, props.valueFormat)
  }
  if (date instanceof Date) {
    return formatDate(
      date,
      props.outletFormat || mapTypeFormat[props.type as keyof typeof mapTypeFormat],
    )
  }
  return date
}

function getOutletText(value: (Date | string)[]) {
  return [getOutletTextMayByStr(value[0]), getOutletTextMayByStr(value[1])].join(` ${t('to')} `)
}

function getInputValue() {
  if (!innerValue.value || (Array.isArray(innerValue.value) && innerValue.value.length === 0)) {
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
