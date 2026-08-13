<template>
  <div :class="formClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import { type FormProps, type FormSlots, type FormExpose, defaultFormProps } from './common'
import { useForm } from './useForm'

const props = withDefaults(defineProps<FormProps>(), defaultFormProps)

defineSlots<FormSlots>()

const bem = createBem('form')

// main
const { expose } = useForm(props)

defineExpose<FormExpose>(expose)

// others
const formClass = computed(() => {
  return [bem.b(), bem.m('card', props.card)]
})
</script>
