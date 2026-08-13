<template>
  <div :class="listClass">
    <div v-if="isRenderVisible(slots.title || title)" :class="bem.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="bem.e('content')">
      <slot></slot>
    </div>
    <div v-if="isRenderVisible(slots.description || description)" :class="bem.e('description')">
      <slot name="description">{{ description }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'
import { isRenderVisible, createBem } from '../../utils'
import { listContextKey, type ListProps, type ListSlots } from './common'

const props = withDefaults(defineProps<ListProps>(), {})

const slots = defineSlots<ListSlots>()

const bem = createBem('list')

// main
provide(
  listContextKey,
  reactive({
    hideBorder: toRef(() => props.hideBorder),
  }),
)

// others
const listClass = computed(() => {
  return [
    bem.b(),
    bem.m('card', props.card),
    bem.m('not-card', !props.card),
    bem.m('inlaid', props.inlaid),
    bem.m('borderless', props.hideBorder),
  ]
})
</script>
