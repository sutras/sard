<template>
  <div :class="accordionClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch, toRef, reactive } from 'vue'
import { createBem } from '../../utils'
import {
  type AccordionProps,
  type AccordionSlots,
  type AccordionEmits,
  type AccordionContext,
  accordionContextKey,
  defaultAccordionProps,
} from './common'

const props = withDefaults(defineProps<AccordionProps>(), defaultAccordionProps)

defineSlots<AccordionSlots>()

const emit = defineEmits<AccordionEmits>()

const bem = createBem('accordion')

// main
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue || []
  },
)

const toggle: AccordionContext['toggle'] = (name) => {
  let value: any
  if (props.multiple) {
    value = Array.isArray(innerValue.value) ? innerValue.value : []
    if (value.includes(name)) {
      value = value.filter((item: any) => item !== name)
    } else {
      value = value.concat(name)
    }
  } else {
    if (innerValue.value === name) {
      value = undefined
    } else {
      value = name
    }
  }
  innerValue.value = value
  emit('update:modelValue', value)
}

provide(
  accordionContextKey,
  reactive({
    value: innerValue,
    multiple: toRef(() => props.multiple),
    toggle,
    hideBorder: toRef(() => props.hideBorder),
  }),
)

// others
const accordionClass = computed(() => {
  return [bem.b(), bem.m('borderless', props.hideBorder)]
})
</script>
