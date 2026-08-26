<template>
  <PopoutInput
    v-bind="partitionedProps[0]"
    v-model="inputValue"
    :multiline="multiple"
    @clear="onClear"
    @click="show"
  >
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="slots.append" #append>
      <slot name="append"></slot>
    </template>
    <template v-if="slots.arrow" #arrow>
      <slot name="arrow"></slot>
    </template>

    <SelectPopout
      v-bind="partitionedProps[1]"
      v-model:visible="innerVisible"
      v-model="innerValue"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
    >
      <template v-if="slots.default" #default>
        <slot></slot>
      </template>
      <template v-if="slots.option" #option="optionProps">
        <slot name="option" v-bind="optionProps"></slot>
      </template>
      <template v-if="slots['option-label']" #option-label="labelProps">
        <slot name="option-label" v-bind="labelProps"></slot>
      </template>
    </SelectPopout>
  </PopoutInput>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import PopoutInput from '../popout-input/popout-input.vue'
import SelectPopout from '../select-popout/select-popout.vue'
import {
  type SelectInputProps,
  type SelectInputSlots,
  type SelectInputEmits,
  type SelectInputExpose,
  defaultSelectInputProps,
} from './common'
import { useOptionKeys } from '../../use'
import { isEmptyArray, isEmptyBinding } from '../../utils'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(defineProps<SelectInputProps>(), defaultSelectInputProps)

const slots = defineSlots<SelectInputSlots>()

const emit = defineEmits<SelectInputEmits>()

const { getLabel, getValue, getChildren } = useOptionKeys(props)

const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit)

const isGroupable = computed(() => {
  const first = props.options[0]
  return first && Array.isArray(getChildren(first))
})

const labelCache: Record<any, any> = {}

watch(
  () => props.mapLabel,
  () => {
    if (props.mapLabel) {
      Object.assign(labelCache, props.mapLabel)
    }
  },
  {
    immediate: true,
  },
)

const getCacheLabel = (option: any, value: any) => {
  if (option) {
    return (labelCache[value] = getLabel(option))
  } else {
    return labelCache[value] ?? value
  }
}

function getOutletText(options: any[], value: any) {
  if (isGroupable.value) {
    options = options.map((option) => getChildren(option)).flat(1)
  }

  if (props.multiple) {
    if (!Array.isArray(value)) return ''

    let labels = value.map((val) => {
      const option = options.find((option) => getValue(option) === val)
      return getCacheLabel(option, val)
    })

    const maxLabels = props.maxLabels === -1 ? Number.MAX_SAFE_INTEGER : props.maxLabels
    const diff = labels.length - maxLabels

    labels = labels.slice(0, maxLabels)

    if (diff > 0) {
      labels.push(`+${diff}`)
    }

    return labels.join(', ')
  } else {
    const option = options.find((option) => getValue(option) === value)
    return getCacheLabel(option, value)
  }
}

function getInputValue() {
  if (isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)) {
    return ''
  }
  return getOutletText(props.options, innerValue.value)
}

watch(
  [innerValue, () => props.options, () => props.maxLabels],
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

defineExpose<SelectInputExpose>({})
</script>
