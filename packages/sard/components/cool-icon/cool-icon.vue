<template>
  <div :class="coolIconClass" :style="coolIconStyle" @click="onClick">
    <div :class="bem.e('bg')" :style="bgStyle">
      <div :class="bem.e('adorns')">
        <div v-for="i in 6" :key="i" :class="bem.e('adorn')"></div>
      </div>
    </div>
    <div :class="bem.e('icon')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type CoolIconProps,
  type CoolIconSlots,
  type CoolIconEmits,
  type CoolIconExpose,
  defaultCoolIconProps,
} from './common'

const props = withDefaults(defineProps<CoolIconProps>(), defaultCoolIconProps)

defineSlots<CoolIconSlots>()

const emit = defineEmits<CoolIconEmits>()

const bem = createBem('cool-icon')

// main

const onClick = (event: any) => {
  emit('click', event)
}

defineExpose<CoolIconExpose>({})

const coolIconClass = computed(() => {
  return [bem.b(), bem.m(props.shape)]
})

const coolIconStyle = computed(() => {
  return {
    width: props.size,
    height: props.size,
    fontSize: props.iconSize,
    color: props.color,
  }
})

const bgStyle = computed(() => {
  return {
    background: props.background,
  }
})
</script>
