<template>
  <div :class="[bem.b(), bem.m(direction)]">
    <slot :toggle="toggle" :value="innerValue">
      <template v-if="options">
        <Radio
          v-for="option in options"
          :key="getKey(getValue(option))"
          :value="getValue(option)"
          :validate-event="false"
        >
          {{ getLabel(option) }}
        </Radio>
      </template>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, toRef, reactive } from 'vue'
import {
  type RadioGroupProps,
  type RadioGroupSlots,
  type RadioGroupEmits,
  type RadioContext,
  radioContextKey,
  defaultRadioGroupProps,
} from './common'
import { createBem } from '../../utils'
import { useFormItemContext } from '../form/common'
import Radio from '../radio/radio.vue'
import { useOptionKeys } from '../../use'

const props = withDefaults(defineProps<RadioGroupProps>(), defaultRadioGroupProps)

const slots = defineSlots<RadioGroupSlots>()

const emit = defineEmits<RadioGroupEmits>()

const bem = createBem('radio-group')

// main
const { getLabel, getValue, getKey } = useOptionKeys(props)

const formItemContext = useFormItemContext()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const toggle: RadioContext['toggle'] = (value) => {
  if (value !== innerValue.value) {
    innerValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
}

provide(
  radioContextKey,
  reactive({
    disabled: toRef(() => props.disabled),
    readonly: toRef(() => props.readonly),
    size: toRef(() => props.size),
    type: toRef(() => props.type),
    checkedColor: toRef(() => props.checkedColor),
    value: innerValue,
    toggle,
  }),
)
</script>
