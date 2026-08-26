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
    <CalendarPopout
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
import CalendarPopout from '../calendar-popout/calendar-popout.vue'
import { formatDate, isString, parseDate } from '../../utils'
import { type CalendarType } from '../calendar/common'
import { useTranslateWithPrefix } from '../../locale'
import {
  type CalendarInputProps,
  type CalendarInputEmits,
  type CalendarInputSlots,
  defaultCalendarInputProps,
} from './common'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(defineProps<CalendarInputProps>(), defaultCalendarInputProps)

const slots = defineSlots<CalendarInputSlots>()

const emit = defineEmits<CalendarInputEmits>()

const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit)

const { t } = useTranslateWithPrefix('calendar')

function getOutletTextMayByStr(date: string | Date) {
  if (isString(date) && props.valueFormat) {
    date = parseDate(date, props.valueFormat)
  }
  if (date instanceof Date) {
    return formatDate(date, props.outletFormat)
  }
  return date
}

function getOutletText(date: Date | Date[] | string | string[], type: CalendarType) {
  if (type === 'single') {
    return getOutletTextMayByStr(date as string | Date)
  }

  if (type === 'range') {
    return [
      getOutletTextMayByStr((date as string[] | Date[])[0]),
      getOutletTextMayByStr((date as string[] | Date[])[1]),
    ].join(` ${t('to')} `)
  }

  if (type === 'multiple') {
    return t('multipleOutlet', {
      count: (date as Date[]).length,
    })
  }

  return ''
}

function getInputValue() {
  if (!innerValue.value || (Array.isArray(innerValue.value) && innerValue.value.length === 0)) {
    return ''
  }
  return getOutletText(innerValue.value, props.type)
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

const onConfirm = (value: Date | Date[] | string | string[] | undefined) => {
  emit('confirm', value)
}
</script>
