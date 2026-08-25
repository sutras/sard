<template>
  <div :class="accordionItemClass">
    <div :class="bem.e('header')" @click="onClick">
      <div :class="bem.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="extra || slots.extra" :class="bem.e('extra')">
        <slot name="extra">{{ extra }}</slot>
      </div>
      <div :class="bem.e('arrow')">
        <slot name="arrow" :visible="visible">
          <Up v-if="visible" />
          <Down v-else />
        </slot>
      </div>
    </div>
    <Collapse :visible="visible">
      <div :class="bem.e('body')">
        <slot></slot>
      </div>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createBem, isNullish } from '../../utils'
import {
  type AccordionItemProps,
  type AccordionItemSlots,
  type AccordionItemEmits,
  accordionContextKey,
} from './common'
import Collapse from '../collapse/collapse.vue'
import { Down, Up } from '@sard/icons'

const props = withDefaults(defineProps<AccordionItemProps>(), {})

const slots = defineSlots<AccordionItemSlots>()

const emit = defineEmits<AccordionItemEmits>()

const bem = createBem('accordion-item')

const context = inject(accordionContextKey)

if (!context) {
  throw new Error('AccordionItem must be included in Accordion.')
}

const onClick = (event: any) => {
  if (!props.disabled && !isNullish(props.name)) {
    context.toggle(props.name)
  }
  emit('click', event)
}

const visible = computed(() => {
  return context.multiple
    ? (context.value || []).includes(props.name)
    : context.value === props.name
})

const accordionItemClass = computed(() => {
  return [bem.b(), bem.is('disabled', props.disabled), bem.m('borderless', context.hideBorder)]
})
</script>
