<template>
  <Input
    inlaid
    :class="popoutInputClass"
    :model-value="innerValue"
    :placeholder="placeholder"
    :readonly="isReadonly"
    :disabled="isDisabled"
    :clearable="clearable"
    :validate-event="false"
    :type="multiline ? 'textarea' : 'text'"
    :auto-height="multiline"
    :rows="1"
    v-bind="mergedProps"
    @clear="onClear"
    @change="onChange"
  >
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
      <div v-if="loading" :class="bem.e('loading')">
        <Loading />
      </div>
      <div v-if="!isReadonly" :class="arrowClass">
        <slot name="arrow">
          <CaretRight />
        </slot>
      </div>
      <div
        :class="bem.e('seal')"
        @pointerdown="onSealPointerDown"
        @touchstart="onSealTouchStart"
        @touchend="onSealTouchEnd"
        @touchcancel="onSealTouchEnd"
        @click="onSealClick"
      />
    </template>
  </Input>

  <slot></slot>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue'
import { createBem } from '../../utils'
import Input from '../input/input.vue'
import { useFormContext } from '../form/common'
import {
  type PopoutInputProps,
  type PopoutInputEmits,
  defaultPopoutInputProps,
  type PopoutInputSlots,
} from './common'
import Loading from '../loading/loading.vue'
import { CaretRight } from '@sard/icons'
import { usePointerDown } from '../../use'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoutInputProps>(), defaultPopoutInputProps)

const slots = defineSlots<PopoutInputSlots>()

const emit = defineEmits<PopoutInputEmits>()

const attrs = useAttrs()

const bem = createBem('popout-input')

// main
const mergedProps = computed(() => {
  return {
    ...props.inputProps,
    ...attrs,
  }
})

const formContext = useFormContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

// value
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

const setInnerValue = (value: string) => {
  if (value !== innerValue.value) {
    innerValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
}

const onChange = (value: string | number) => {
  setInnerValue(value as string)
}

const onClear = () => {
  setInnerValue('')
  emit('clear')
}

// seal
const isSealDown = ref(false)
const operable = computed(() => {
  return !isDisabled.value && !isReadonly.value && !props.loading
})

const onSealTouchStart = () => {
  if (operable.value) {
    isSealDown.value = true
  }
}

const onSealTouchEnd = () => {
  if (operable.value) {
    isSealDown.value = false
  }
}

const onSealPointerDown = usePointerDown(onSealTouchStart, undefined, onSealTouchEnd)

const onSealClick = (event: MouseEvent) => {
  if (operable.value) {
    emit('click', event)
  }
}

// others
const popoutInputClass = computed(() => {
  return [
    bem.b(),
    bem.m('down', isSealDown.value),
    bem.m('loading', props.loading),
    bem.m('readonly', isReadonly.value),
    bem.m('disabled', isDisabled.value),
  ]
})

const arrowClass = computed(() => {
  return bem.e('arrow')
})
</script>
