<template>
  <PopoutInput v-bind="partitionedProps[0]" v-model="inputValue" @clear="onClear" @click="show">
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="slots.append" #append>
      <slot name="append"></slot>
    </template>
    <template v-if="slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>
    <RadioPopout
      v-bind="partitionedProps[1]"
      v-model:visible="innerVisible"
      v-model="innerValue"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    />
  </PopoutInput>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import PopoutInput from '../popout-input/popout-input.vue'
import RadioPopout from '../radio-popout/radio-popout.vue'
import {
  type RadioInputProps,
  type RadioInputEmits,
  type RadioInputOption,
  type RadioInputSlots,
  defaultRadioInputProps,
} from './common'
import { isEmptyBinding, isNullish } from '../../utils'
import { useOptionKeys } from '../../use'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(defineProps<RadioInputProps>(), defaultRadioInputProps)

const slots = defineSlots<RadioInputSlots>()

const emit = defineEmits<RadioInputEmits>()

const { getLabel, getValue } = useOptionKeys(props)

const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit)

function getOutletText(options: RadioInputOption[], value: any) {
  const option = options.find((option) => getValue(option) === value)
  return isNullish(option) ? '' : getLabel(option)
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value)) {
    return ''
  }
  return getOutletText(props.options, innerValue.value)
}

watch(
  [innerValue, () => props.options],
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

const onConfirm = (value: any) => {
  emit('confirm', value)
}
</script>
