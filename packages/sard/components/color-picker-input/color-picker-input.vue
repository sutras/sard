<template>
  <PopoutInput
    v-bind="partitionedProps[0]"
    v-model="inputValue"
    :class="bem.b()"
    @clear="onClear"
    @click="show"
  >
    <template #prepend>
      <div :class="bem.e('preview')">
        <div :class="bem.e('preview-fill')" :style="previewStyle"></div>
      </div>
      <slot name="prepend"></slot>
    </template>
    <template v-if="slots.append" #append>
      <slot name="append"></slot>
    </template>
    <template v-if="slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>

    <ColorPickerPopout
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
import { computed, watch } from 'vue'
import ColorPickerPopout from '../color-picker-popout/color-picker-popout.vue'
import PopoutInput from '../popout-input/popout-input.vue'
import {
  type ColorPickerInputProps,
  type ColorPickerInputSlots,
  type ColorPickerInputEmits,
  type ColorPickerInputExpose,
  defaultColorPickerInputProps,
} from './common'
import { isEmptyBinding, createBem } from '../../utils'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(defineProps<ColorPickerInputProps>(), defaultColorPickerInputProps)

const slots = defineSlots<ColorPickerInputSlots>()

const emit = defineEmits<ColorPickerInputEmits>()

const bem = createBem('color-picker-input')

// main
const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit)

const getInputValue = () => {
  if (isEmptyBinding(innerValue.value)) {
    return ''
  }
  return String(innerValue.value)
}

watch(
  innerValue,
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

const previewStyle = computed(() => {
  return {
    background: innerValue.value,
  }
})

const onConfirm = () => {
  emit('confirm')
}

defineExpose<ColorPickerInputExpose>({})
</script>
