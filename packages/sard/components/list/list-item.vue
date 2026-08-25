<template>
  <div :class="listItemClass" @click="onClick">
    <slot>
      <div v-if="slots.icon" :class="bem.e('icon')">
        <slot name="icon"></slot>
      </div>
      <div :class="bem.e('title')">
        <slot name="title">{{ title }}</slot>
        <div v-if="isRenderVisible(slots.description || description)" :class="bem.e('description')">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>

      <div v-if="isRenderVisible(slots.value || value)" :class="bem.e('value')">
        <slot name="value">{{ value }}</slot>
      </div>
      <slot name="arrow">
        <div v-if="arrow" :class="bem.e('arrow')">
          <Up v-if="arrowDirection === 'up'" />
          <Right v-else-if="arrowDirection === 'right'" />
          <Down v-else-if="arrowDirection === 'down'" />
        </div>
      </slot>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { isRenderVisible, createBem } from '../../utils'
import {
  type ListItemProps,
  type ListItemSlots,
  type ListItemEmits,
  defaultListItemProps,
  listContextKey,
} from './common'
import { Down, Right, Up } from '@sard/icons'

const props = withDefaults(defineProps<ListItemProps>(), defaultListItemProps)

const slots = defineSlots<ListItemSlots>()

const emit = defineEmits<ListItemEmits>()

const bem = createBem('list-item')

const context = inject(listContextKey, null)

const onClick = (event: any) => {
  emit('click', event)
}

// ============================ style ============================

const listItemClass = computed(() => {
  return [
    bem.b(),
    bem.m('hover', props.hover),
    bem.m('custom', !!slots.default),
    bem.m('borderless', context?.hideBorder),
  ]
})
</script>
