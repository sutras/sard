<template>
  <Popout
    v-model:visible="innerVisible"
    :title="slots.title ? '' : title"
    :show-confirm="showConfirm"
    :confirm-disabled="confirmDisabled"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <template #title-prepend>
      <slot name="title-prepend"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <Calendar v-bind="omittedProps" :model-value="draftValue" @change="onChange" />
  </Popout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Popout from '../popout/popout.vue'
import Calendar from '../calendar/calendar.vue'
import {
  type CalendarPopoutProps,
  type CalendarPopoutEmits,
  type CalendarPopoutSlots,
  defaultCalendarPopoutProps,
} from './common'
import { omitFormPopoutProps, useFormPopout } from '../popout/useFormPopout'

const props = withDefaults(defineProps<CalendarPopoutProps>(), defaultCalendarPopoutProps)

const slots = defineSlots<CalendarPopoutSlots>()

const emit = defineEmits<CalendarPopoutEmits>()

// main
const omittedProps = omitFormPopoutProps(props)

const { innerVisible, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(
  props,
  emit,
  {
    onChange() {
      if (!props.showConfirm && !confirmDisabled.value) {
        onConfirm(false)
        innerVisible.value = false
      }
    },
  },
)

const confirmDisabled = computed(() => {
  const value = draftValue.value
  return !value || (Array.isArray(value) && value.length === 0)
})
</script>
