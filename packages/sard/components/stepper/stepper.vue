<template>
  <div :class="stepperClass">
    <div
      :class="[
        bem.e('button'),
        bem.is('disabled', isDisabled || isMin),
        bem.is('readonly', isReadonly),
        bem.em('button', 'decrease'),
      ]"
      @click="onButtonClick(-1, isMin)"
      @touchstart="onDecTouchStart"
      @touchmove="onDecTouchMove"
      @touchend="onDecTouchEnd"
      @touchcancel="onDecTouchEnd"
      @pointerdown="onDecPointerDown"
    >
      <Minus />
    </div>
    <Input
      v-model="inputValue"
      :class="bem.e('input')"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="isDisabled || isReadonly"
      :validate-event="validateEvent"
      :precision="precision"
      :min="min"
      :max="max"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
    <div
      :class="[
        bem.e('button'),
        bem.is('disabled', isDisabled || isMax),
        bem.is('readonly', isReadonly),
        bem.em('button', 'increase'),
      ]"
      @click="onButtonClick(1, isMax)"
      @touchstart="onIncTouchStart"
      @touchmove="onIncTouchMove"
      @touchend="onIncTouchEnd"
      @touchcancel="onIncTouchEnd"
      @pointerdown="onIncPointerDown"
    >
      <Plus />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useModel, watch } from 'vue'
import { createBem, isNullish, clamp } from '../../utils'
import Input from '../input/input.vue'
import { useFormContext } from '../form/common'
import { type StepperProps, type StepperEmits, defaultStepperProps } from './common'
import { usePointerDown, useSimulatedPress } from '../../use'
import { Minus, Plus } from '@sard/icons'

const props = withDefaults(defineProps<StepperProps>(), defaultStepperProps)

const emit = defineEmits<StepperEmits>()

const bem = createBem('stepper')

// main
const formContext = useFormContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

// 输入框
const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue
  },
)

const innerValue = useModel(props, 'modelValue')

const setValue = (value: string | number) => {
  inputValue.value = value
  innerValue.value = value
  emit('change', value)
}

const normalizedValue = (value: number) => {
  if (isNaN(value)) return 0
  value = clamp(value, props.min, props.max)
  if (props.precision !== undefined) {
    value = +value.toFixed(props.precision)
  }
  return value
}

const setValueByStep = (delta: number) => {
  setValue(normalizedValue((Number(innerValue.value) || 0) + props.step * delta))
}

const onChange = (value: string | number) => {
  if (value === '') {
    setValue(getValueOnClear())
  } else {
    setValue(normalizedValue(Number(value)))
  }
}

const getValueOnClear = () => {
  return props.valueOnClear === 'min'
    ? props.min
    : props.valueOnClear === 'max'
      ? props.max
      : props.valueOnClear
}

const onBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const onFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// 按钮
const isMin = computed(() => {
  return !isNullish(innerValue.value) && Number(innerValue.value) <= props.min
})
const isMax = computed(() => {
  return !isNullish(innerValue.value) && Number(innerValue.value) >= props.max
})

const onButtonClick = (delta: number, arrived: boolean) => {
  if (!isDisabled.value && !isReadonly.value && !arrived) {
    setValueByStep(delta)
  }
}

// ============================ 长按 ============================

let pressDelta: -1 | 0 | 1 = 0

const tick = () => {
  if (pressDelta) {
    setValueByStep(pressDelta)
    setTimeout(() => {
      tick()
    }, props.interval)
  }
}

const onPressStart = (delta: -1 | 1) => {
  if (
    !!pressDelta ||
    !props.press ||
    isDisabled.value ||
    isReadonly.value ||
    (delta === -1 && isMin.value) ||
    (delta === 1 && isMax.value)
  ) {
    return
  }
  pressDelta = delta
  tick()
}

const onPressEnd = () => {
  pressDelta = 0
}

// decrease
const onDecTouchStart = (event: TouchEvent) => {
  onDecSimulatedPressTouchStart(event)
}

const onDecTouchMove = (event: TouchEvent) => {
  onDecSimulatedPressTouchMove(event)
}

const onDecTouchEnd = () => {
  onDecSimulatedPressTouchEnd()
}

const onDecPointerDown = usePointerDown(onDecTouchStart, onDecTouchMove, onDecTouchEnd)

const [onDecSimulatedPressTouchStart, onDecSimulatedPressTouchMove, onDecSimulatedPressTouchEnd] =
  useSimulatedPress({
    start: () => {
      onPressStart(-1)
    },
    end: onPressEnd,
    duration: props.pressTime,
  })

// increase
const onIncTouchStart = (event: TouchEvent) => {
  onIncSimulatedPressTouchStart(event)
}

const onIncTouchMove = (event: TouchEvent) => {
  onIncSimulatedPressTouchMove(event)
}

const onIncTouchEnd = () => {
  onIncSimulatedPressTouchEnd()
}

const onIncPointerDown = usePointerDown(onIncTouchStart, onIncTouchMove, onIncTouchEnd)

const [onIncSimulatedPressTouchStart, onIncSimulatedPressTouchMove, onIncSimulatedPressTouchEnd] =
  useSimulatedPress({
    start: () => {
      onPressStart(1)
    },
    end: onPressEnd,
    duration: props.pressTime,
  })

// others
const stepperClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.size),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
    bem.m(props.variant),
  ]
})
</script>
