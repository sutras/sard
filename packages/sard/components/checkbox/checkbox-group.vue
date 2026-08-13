<template>
  <div :class="[bem.b(), bem.m(direction)]">
    <slot :toggle="toggle" :value="innerValue">
      <template v-if="options">
        <Checkbox
          v-for="option in options"
          :key="getKey(getValue(option))"
          :value="getValue(option)"
          :validate-event="false"
        >
          {{ getLabel(option) }}
        </Checkbox>
      </template>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, toRef, reactive } from 'vue'
import {
  type CheckboxGroupProps,
  type CheckboxGroupSlots,
  type CheckboxGroupEmits,
  type CheckboxContext,
  checkboxContextKey,
  defaultCheckboxGroupProps,
} from './common'
import { createBem } from '../../utils'
import { useFormItemContext } from '../form/common'
import Checkbox from '../checkbox/checkbox.vue'
import { useOptionKeys } from '../../use'

const props = withDefaults(defineProps<CheckboxGroupProps>(), defaultCheckboxGroupProps)

const slots = defineSlots<CheckboxGroupSlots>()

const emit = defineEmits<CheckboxGroupEmits>()

const bem = createBem('checkbox-group')

// main
const { getLabel, getValue, getKey } = useOptionKeys(props)

const formItemContext = useFormItemContext()

const innerValue = ref(props.modelValue || [])

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue || []

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const toggle: CheckboxContext['toggle'] = (value) => {
  const nextValue = innerValue.value.includes(value)
    ? innerValue.value.filter((v) => v !== value)
    : innerValue.value.concat(value)

  innerValue.value = nextValue
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}

provide(
  checkboxContextKey,
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
