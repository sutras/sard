<template>
  <div :class="itemClass">
    <div :class="bem.e('header')">
      <div :class="[bem.e('line'), bem.em('line', 'before')]"></div>
      <div :class="bem.e('icon-wrapper')">
        <div v-if="slots.icon" :class="bem.e('icon')">
          <slot name="icon"></slot>
        </div>
        <div v-else :class="bem.e('dot')"></div>
      </div>
      <div :class="[bem.e('line'), bem.em('line', 'after')]"></div>
    </div>
    <div :class="bem.e('body')">
      <div v-if="title || slots.title" :class="bem.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="slots.default" :class="bem.e('description')">
        <slot></slot>
      </div>
      <div :class="bem.e('time')">
        <slot name="time">{{ time }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type TimelineItemProps, type TimelineItemSlots } from './common'

const props = withDefaults(defineProps<TimelineItemProps>(), {})

const slots = defineSlots<TimelineItemSlots>()

const bem = createBem('timeline-item')

// ============================ style ============================
const itemClass = computed(() => {
  return [bem.b(), bem.m('dotted', !slots.icon)]
})
</script>
