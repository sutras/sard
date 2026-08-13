<template>
  <div :class="tagClass" @click="$emit('click', $event)">
    <slot></slot>
    <div v-if="closable" :class="bem.e('close')" @click.stop="$emit('close', $event)">
      <Close />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type TagProps, type TagSlots, type TagEmits, defaultTagProps } from './common'
import { Close } from '@sard/icons'

const props = withDefaults(defineProps<TagProps>(), defaultTagProps)

defineSlots<TagSlots>()

defineEmits<TagEmits>()

const bem = createBem('tag')

// main

// others
const tagClass = computed(() => {
  return [
    bem.b(),
    bem.m(`${props.variant}-${props.color}`),
    bem.m(props.size),
    bem.m('round', props.round),
    bem.m(`mark-${props.mark}`, !!props.mark),
  ]
})
</script>
