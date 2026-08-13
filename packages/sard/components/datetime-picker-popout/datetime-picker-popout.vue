<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    @confirm="onConfirm"
    @enter="onEnter"
    @visible-hook="onVisibleHook"
  >
    <DatetimePicker v-bind="omittedProps" :model-value="draftValue" @change="onChange" />
  </Popout>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import Popout from '../popout/popout.vue'
import DatetimePicker from '../datetime-picker/datetime-picker.vue'
import {
  type DatetimePickerPopoutProps,
  type DatetimePickerPopoutSlots,
  type DatetimePickerPopoutEmits,
  defaultDatetimePickerPopoutProps,
} from './common'
import { formatDate, isEmptyBinding, toDate } from '../../utils'
import { getInitialValue, getMaxDate, getMinDate } from '../datetime-picker/common'
import { omitFormPopoutProps, useFormPopout } from '../popout/useFormPopout'

const props = withDefaults(
  defineProps<DatetimePickerPopoutProps>(),
  defaultDatetimePickerPopoutProps,
)

defineSlots<DatetimePickerPopoutSlots>()

const emit = defineEmits<DatetimePickerPopoutEmits>()

// main
const omittedProps = omitFormPopoutProps(props)

const minDate = computed(() => toDate(props.min || getMinDate(), props.valueFormat))

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate())
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const { innerVisible, innerValue, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(
  props,
  emit,
  {
    onConfirmBefore() {
      if (!draftValue.value) {
        const initialValue = getInitialValue(minDate.value, maxDate.value)
        draftValue.value = props.valueFormat
          ? formatDate(initialValue, props.valueFormat)
          : initialValue
      }
    },
  },
)

const onEnter = () => {
  if (!isEmptyBinding(innerValue.value) && draftValue.value !== innerValue.value) {
    draftValue.value = innerValue.value
  }
}

const normalizeValue = (value: Date | string | undefined | null) => {
  const date = value ? toDate(value, props.valueFormat) : new Date()
  return date < minDate.value
    ? new Date(minDate.value)
    : date > maxDate.value
      ? new Date(maxDate.value)
      : date
}

watch([minDate, maxDate], () => {
  if (innerValue.value) {
    const oldDate = toDate(innerValue.value, props.valueFormat)
    const value = normalizeValue(innerValue.value)

    if (value.getTime() !== oldDate.getTime()) {
      draftValue.value = value
      onConfirm()
    }
  }
})
</script>
