<template>
  <span>{{ renderedNumer }}</span>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { animateNumber, type Animation } from '../../utils/animation'
import { addSeparator } from '../../utils'
import { type CountToProps, defaultCountToProps } from './common'

const props = withDefaults(defineProps<CountToProps>(), defaultCountToProps)

const number = ref(0)
let animation: undefined | Animation

const renderedNumer = computed(() => {
  const fixedNum = number.value.toFixed(props.precision)
  return props.separator ? addSeparator(fixedNum, props.separator, props.separatorDigit) : fixedNum
})

watch(
  () => props.value,
  () => {
    animation?.pause()
    animation = animateNumber(number, props.value, {
      duration: props.duration,
      easing: 'easeOutQuint',
      round: Math.pow(10, props.precision),
    })
  },
  {
    flush: 'post',
    immediate: true,
  },
)

onUnmounted(() => {
  animation?.pause()
})
</script>
