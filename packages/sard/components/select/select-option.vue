<template>
  <div ref="option" :class="selectOptionClass" @click="onClick">
    <slot :disabled="isDisabled" :selected="isSelected" :label="label" :value="value">
      <div :class="bem.e('label')">
        <slot
          name="label"
          :disabled="isDisabled"
          :selected="isSelected"
          :label="label"
          :value="value"
        >
          {{ label }}
        </slot>
      </div>
      <div :class="bem.e('icon')">
        <Success />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, reactive, toRef, useTemplateRef } from 'vue'
import { createBem, isEmptyBinding } from '../../utils'
import {
  type SelectOptionProps,
  type SelectOptionSlots,
  type SelectOptionEmits,
  type SelectOptionExpose,
  defaultSelectOptionProps,
  selectOptionGroupContextKey,
} from './common'
import { type SelectMember, selectContextKey } from './common'
import { Success } from '@sard/icons'

const props = withDefaults(defineProps<SelectOptionProps>(), defaultSelectOptionProps)

const slots = defineSlots<SelectOptionSlots>()

const emit = defineEmits<SelectOptionEmits>()

const bem = createBem('select-option')

// main
const optionRef = useTemplateRef('option')

const context = inject(selectContextKey)!

if (!context) {
  throw new Error('SelectOption must be included in Select.')
}

const { multiple, multipleLimit, innerValue, toggle, addMember, removeMember } = context

const groupContext = inject(selectOptionGroupContextKey, null)

const isSelected = computed(() => {
  return multiple.value
    ? innerValue.value.includes(props.value)
    : !isEmptyBinding(innerValue.value) && innerValue.value === props.value
})

const isDisabled = computed(() => {
  return (
    groupContext?.disabled ||
    props.disabled ||
    (multiple.value &&
      multipleLimit.value > 0 &&
      innerValue.value.length >= multipleLimit.value &&
      !isSelected.value)
  )
})

const onClick = (event: any) => {
  if (!isDisabled.value) {
    toggle(props.value)
    emit('click', event)
  }
}

const member: SelectMember = reactive({
  el: optionRef,
  isSelected,
  value: toRef(() => props.value),
  disabled: isDisabled,
})

onMounted(() => {
  addMember(member)
})

onUnmounted(() => {
  removeMember(member)
})

// others
defineExpose<SelectOptionExpose>({})

const selectOptionClass = computed(() => {
  return [
    bem.b(),
    bem.is('selected', isSelected.value),
    bem.is('disabled', isDisabled.value),
    bem.is('plain', props.plain),
  ]
})
</script>
