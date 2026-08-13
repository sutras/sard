<template>
  <div :class="bem.b()">
    <slot name="header"></slot>
    <Tabs v-model="tabsCurrent" :options="tabsOptions" scrollable />

    <div :class="bem.e('container')">
      <div
        :class="bem.e('wrapper')"
        :style="{
          '--x': `${-Number(tabsCurrent) * 100}%`,
        }"
      >
        <div :class="bem.e('pane')">
          <DatetimePicker v-bind="datetimePickerProps" v-model="startValue" @change="onChange" />
        </div>
        <div :class="bem.e('pane')">
          <DatetimePicker
            v-bind="datetimePickerProps"
            v-model="endValue"
            :min="startValue"
            @change="onChange"
          />
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { createBem, omit, toDate } from '../../utils'
import DatetimePicker from '../datetime-picker/datetime-picker.vue'
import Tabs from '../tabs/tabs.vue'
import {
  type DatetimeRangePickerProps,
  type DatetimeRangePickerSlots,
  type DatetimeRangePickerEmits,
  defaultDatetimeRangePickerProps,
} from './common'
import { getMaxDate, getMinDate, normalizeRangeValue } from '../datetime-picker/common'

const props = withDefaults(defineProps<DatetimeRangePickerProps>(), defaultDatetimeRangePickerProps)

defineSlots<DatetimeRangePickerSlots>()

const emit = defineEmits<DatetimeRangePickerEmits>()

const bem = createBem('datetime-range-picker')

// main
const datetimePickerProps = computed(() => {
  return omit(props, ['modelValue', 'tabs'])
})

// tabs
const tabsOptions = computed(() => {
  return [
    {
      label: props.tabs?.[0],
      value: 0,
    },
    {
      label: props.tabs?.[1],
      value: 1,
    },
  ]
})

const tabsCurrent = ref(0)

// value
const minDate = computed(() => toDate(props.min || getMinDate(), props.valueFormat))

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate(), props.valueFormat)
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const startValue = ref<string | Date>()
const endValue = ref<string | Date>()

watch(
  () => props.modelValue,
  (value) => {
    const [start, end] = normalizeRangeValue(minDate.value, maxDate.value, value, props.valueFormat)
    startValue.value = start
    endValue.value = end
  },
  {
    immediate: true,
  },
)

const onChange = () => {
  if (startValue.value && endValue.value) {
    const emitValue = [startValue.value, endValue.value]
    emit('update:modelValue', emitValue)
    emit('change', emitValue)
  }
}
</script>
