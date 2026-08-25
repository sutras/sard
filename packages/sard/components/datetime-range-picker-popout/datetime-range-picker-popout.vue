<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    @confirm="onConfirm"
    @enter="onEnter"
    @visible-hook="onVisibleHook"
  >
    <DatetimeRangePicker v-bind="omittedProps" :model-value="draftValue" @change="onChange">
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </DatetimeRangePicker>
  </Popout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Popout from '../popout/popout.vue'
import DatetimeRangePicker from '../datetime-range-picker/datetime-range-picker.vue'
import {
  type DatetimeRangePickerPopoutProps,
  type DatetimeRangePickerPopoutSlots,
  type DatetimeRangePickerPopoutEmits,
  defaultDatetimeRangePickerPopoutProps,
} from './common'
import { isEmptyBinding, toDate } from '../../utils'
import { getMaxDate, getMinDate, normalizeRangeValue } from '../datetime-picker/common'
import { omitFormPopoutProps, useFormPopout } from '../popout/useFormPopout'

const props = withDefaults(
  defineProps<DatetimeRangePickerPopoutProps>(),
  defaultDatetimeRangePickerPopoutProps,
)

defineSlots<DatetimeRangePickerPopoutSlots>()

const emit = defineEmits<DatetimeRangePickerPopoutEmits>()

const omittedProps = omitFormPopoutProps(props)

const minDate = computed(() => toDate(props.min || getMinDate(), props.valueFormat))

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate(), props.valueFormat)
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const { innerVisible, innerValue, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(
  props,
  emit,
  {
    onConfirmBefore() {
      if (
        !draftValue.value ||
        (Array.isArray(draftValue.value) && draftValue.value.filter(Boolean).length < 2)
      ) {
        draftValue.value = normalizeRangeValue(
          minDate.value,
          maxDate.value,
          draftValue.value,
          props.valueFormat,
        )
      }
    },
  },
)

const onEnter = () => {
  if (!isEmptyBinding(innerValue.value) && draftValue.value !== innerValue.value) {
    draftValue.value = innerValue.value
  }
}
</script>
