<template>
  <div>
    <slot :time="currentTime">
      {{ formatTime(format, currentTime) }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { toRef, watch } from 'vue'
import {
  type CountDownProps,
  type CountDownSlots,
  type CountDownEmits,
  type CountDownExpose,
  defaultCountDownProps,
} from './common'
import { formatTime, useCountDown } from './useCountDown'

const props = withDefaults(defineProps<CountDownProps>(), defaultCountDownProps)

defineSlots<CountDownSlots>()

const emit = defineEmits<CountDownEmits>()

// main
const { currentTime, start, pause, reset } = useCountDown({
  time: toRef(() => props.time),
  millisecond: toRef(() => props.millisecond),
  autoStart: props.autoStart,
  onFinish: () => {
    emit('finish')
  },
})

watch(currentTime, () => {
  emit('change', currentTime.value)
})

defineExpose<CountDownExpose>({
  start,
  pause,
  reset,
})
</script>
