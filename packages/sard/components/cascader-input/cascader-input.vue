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
    <CascaderPopout
      v-bind="partitionedProps[1]"
      v-model:visible="innerVisible"
      v-model="innerValue"
      @change="onChange"
      @visible-hook="onVisibleHook"
      @confirm="onConfirm"
      @select="(option, tabIndex) => $emit('select', option, tabIndex)"
    >
      <template #top="{ tabIndex }">
        <slot name="top" :tab-index="tabIndex"></slot>
      </template>
    </CascaderPopout>
  </PopoutInput>
</template>

<script setup lang="ts">
import { watch, computed, shallowRef, provide } from 'vue'
import PopoutInput from '../popout-input/popout-input.vue'
import CascaderPopout from '../cascader-popout/cascader-popout.vue'
import {
  type CascaderOption,
  type CascaderValue,
  cascaderOptionsContextKey,
  getSelectedOptionsByValue,
} from '../cascader/common'
import { isEmptyArray, isEmptyBinding, isNullish } from '../../utils'
import { useOptionKeys } from '../../use'
import {
  type CascaderInputProps,
  type CascaderInputSlots,
  type CascaderInputEmits,
  defaultCascaderInputProps,
} from './common'
import { partitionPopoutInputProps, usePopoutInput } from '../popout-input/usePopoutInput'

const props = withDefaults(defineProps<CascaderInputProps>(), defaultCascaderInputProps)

const slots = defineSlots<CascaderInputSlots>()

const emit = defineEmits<CascaderInputEmits>()

const optionKeys = useOptionKeys(props)

const partitionedProps = partitionPopoutInputProps(props)

const { innerVisible, innerValue, inputValue, show, onChange, onClear, onVisibleHook } =
  usePopoutInput(props, emit, {
    onClear(value) {
      emit('update:modelValue', value, [])
      emit('change', value, [])
    },
  })

const { getLabel } = optionKeys

const lazyOptions = shallowRef<CascaderOption[]>([])

provide(cascaderOptionsContextKey, {
  set(options) {
    lazyOptions.value = options
  },
})

const renderedOptions = computed(() => {
  return props.lazy && !!props.load ? lazyOptions.value : props.options
})

function getOutletText(options: CascaderOption[], value: CascaderValue): string | string[] {
  const selectedOptions = getSelectedOptionsByValue(options, value, optionKeys, props.multiple)

  if (!selectedOptions || selectedOptions.length === 0) {
    return getValueDisplay(value)
  }

  const labels = selectedOptions.map((option) => {
    return Array.isArray(option) ? option.map((item) => getLabel(item)) : getLabel(option)
  })

  return props.multiple ? labels.map((item) => (item as string[]).join('/')) : labels.join('/')
}

function getValueDisplay(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => (Array.isArray(item) ? item.join('/') : item)) as string[]
  }
  return isNullish(value) ? '' : String(value)
}

function getInputValue(options: CascaderOption[]) {
  if (isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)) {
    return ''
  }
  if (!options || isEmptyArray(options)) {
    return getValueDisplay(innerValue.value)
  }
  return getOutletText(options, innerValue.value)
}

function getMayMultilineText(value: string | string[]) {
  if (Array.isArray(value)) {
    const maxRows = props.maxRows === -1 ? Number.MAX_SAFE_INTEGER : props.maxRows
    const diff = value.length - maxRows

    const rows = value.slice(0, maxRows)

    if (diff > 0) {
      rows.push(`+${diff}`)
    }

    return rows.join('\n')
  }
  return value
}

watch(
  [innerValue, renderedOptions],
  () => {
    inputValue.value = getMayMultilineText(getInputValue(renderedOptions.value))
  },
  {
    immediate: true,
  },
)

const onConfirm = () => {
  emit('confirm')
}
</script>
