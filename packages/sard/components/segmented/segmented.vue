<template>
  <div :class="segmentedClass">
    <div :class="bem.e('wrapper')">
      <div :class="bem.e('pointer')" :style="pointerStyle"></div>
      <slot>
        <SegmentedItem
          v-for="(option, i) in convertedOptions"
          :key="i"
          :value="option.value"
          :label="option.label"
          :disabled="option.disabled"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, toRef, watch } from 'vue'
import { createBem, isPrimitive } from '../../utils'
import {
  type SegmentedProps,
  type SegmentedSlots,
  type SegmentedEmits,
  type SegmentedExpose,
  type SegmentedContext,
  defaultSegmentedProps,
  segmentedContextKey,
} from './common'
import SegmentedItem from './segmented-item.vue'
import { useFormItemContext } from '../form'
import { useOptionKeys } from '../../use'

const props = withDefaults(defineProps<SegmentedProps>(), defaultSegmentedProps)

defineSlots<SegmentedSlots>()

const emit = defineEmits<SegmentedEmits>()

const bem = createBem('segmented')

const { getLabel, getValue, getDisabled } = useOptionKeys(props)

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

const convertedOptions = computed(() => {
  return (props.options || []).map((option) => {
    return isPrimitive(option)
      ? {
          label: option,
          value: option,
        }
      : {
          label: getLabel(option),
          value: getValue(option),
          disabled: getDisabled(option),
        }
  })
})

const currentIndex = computed(() => {
  return convertedOptions.value.findIndex((option) => option.value === innerValue.value)
})

const optionsCount = computed(() => convertedOptions.value.length)

const toggle: SegmentedContext['toggle'] = (value) => {
  if (value !== innerValue.value) {
    innerValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
}

provide(
  segmentedContextKey,
  reactive({
    disabled: toRef(() => props.disabled),
    readonly: toRef(() => props.readonly),
    size: toRef(() => props.size),
    shape: toRef(() => props.shape),
    ellipsis: toRef(() => props.ellipsis),
    value: innerValue,
    toggle,
  }),
)

// ============================ style ============================

const segmentedClass = computed(() => {
  return [bem.b(), bem.m(props.size), bem.m(props.direction), bem.m(props.shape)]
})

const pointerStyle = computed(() => {
  const isHorizontal = props.direction === 'horizontal'
  return {
    [isHorizontal ? 'width' : 'height']: (1 / optionsCount.value) * 100 + '%',
    '--offset': `${currentIndex.value * 100}%`,
  }
})

defineExpose<SegmentedExpose>({})
</script>
