<template>
  <div :class="bem.b()">
    <div :class="iconClass">
      <slot name="icon">
        <CheckCircleFill v-if="status === 'success'" />
        <InfoCircleFill v-else-if="status === 'info'" />
        <WarningFill v-else-if="status === 'warning'" />
        <XOctagonFill v-else-if="status === 'error'" />
        <QuestionCircleFill v-else-if="status === 'question'" />
      </slot>
    </div>

    <div v-if="title" :class="bem.e('title')">
      <slot name="title">{{ title }}</slot>
    </div>

    <div v-if="description" :class="bem.e('description')">
      <slot name="description">{{ description }}</slot>
    </div>

    <div v-if="slots.default" :class="bem.e('extra')"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type ResultProps, type ResultSlots, defaultResultProps } from './common'
import {
  CheckCircleFill,
  InfoCircleFill,
  QuestionCircleFill,
  WarningFill,
  XOctagonFill,
} from '@sard/icons'

const props = withDefaults(defineProps<ResultProps>(), defaultResultProps)

const slots = defineSlots<ResultSlots>()

const bem = createBem('result')

const iconClass = computed(() => {
  return [bem.e('icon'), bem.em('icon', props.status)]
})
</script>
