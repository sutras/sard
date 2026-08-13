<template>
  <div :class="backTopClass" :style="backTopStyle" @click="onClick">
    <slot>
      <Backtop />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import {
  type BackTopProps,
  type BackTopSlots,
  type BackTopEmits,
  defaultBackTopProps,
} from './common'
import { Backtop } from '@sard/icons'

const props = withDefaults(defineProps<BackTopProps>(), defaultBackTopProps)

defineSlots<BackTopSlots>()

const emit = defineEmits<BackTopEmits>()

const bem = createBem('back-top')

// main
const visible = computed(() => {
  return props.scrollTop >= props.visibleHeight
})

const onClick = (event: any) => {
  emit('click', event)
}

// others
const backTopClass = computed(() => {
  return [bem.b(), bem.m('visible', visible.value)]
})

const backTopStyle = computed(() => {
  return {
    insetInlineEnd: props.right,
    bottom: props.bottom,
  }
})
</script>
