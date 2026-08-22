<template>
  <div :class="pickerClass">
    <PickerView
      :class="pickerViewClass"
      :indicator-class="indicatorClass"
      :value="columnIndexes"
      @change="onChange"
    >
      <PickerViewColumn v-for="(column, i) in renderedColumns" :key="i">
        <div v-for="(option, j) in column" :key="j" :class="bem.e('item')">
          <slot name="option" :option="option" :rowIndex="j" :columnIndex="i">
            {{ optionKeys.getLabel(option) }}
          </slot>
        </div>
      </PickerViewColumn>
    </PickerView>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, ref, watch } from 'vue'
import { createBem, nestedToMulti, toArray, arrayEqual } from '../../utils'
import {
  type PickerProps,
  type PickerSlots,
  type PickerEmits,
  getColumnsType,
  getIndexesByValue,
  getCascaderValidIndexes,
  getOptionsByIndexes,
  getMaySingleValueByOptions,
  defaultPickerProps,
} from './common'
import PickerView from '../picker-view/picker-view'
import PickerViewColumn from '../picker-view/picker-view-column.tsx'
import { useOptionKeys } from '../../use'

const props = withDefaults(defineProps<PickerProps<T>>(), defaultPickerProps)

const slots = defineSlots<PickerSlots<T>>()

const emit = defineEmits<PickerEmits<T>>()

const bem = createBem('picker')

const optionKeys = useOptionKeys(props)

// ============================ value ============================
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

// ============================ columns ============================
const columnsType = computed(() => {
  return getColumnsType(props.columns, optionKeys)
})

const columnIndexes = ref<number[]>([])

watch(
  [innerValue, () => props.columns, optionKeys.aliasProps],
  () => {
    const indexes = getIndexesByValue(toArray(innerValue.value), props.columns, optionKeys)
    if (!arrayEqual(indexes, columnIndexes.value)) {
      columnIndexes.value = indexes
    }
  },
  {
    immediate: true,
  },
)

const renderedColumns = computed<any[][]>(() => {
  switch (columnsType.value) {
    case 'single':
      return [props.columns as any[]]
    case 'multi':
      return props.columns as any[][]
    case 'cascader':
      return nestedToMulti(props.columns, toArray(innerValue.value), optionKeys)
    default:
      return []
  }
})

// ============================ change ============================
const onChange = (value: number[]) => {
  if (!props.columns || props.columns.length === 0) {
    return
  }

  let indexes = value as number[]

  indexes = renderedColumns.value.map((_, index) => indexes[index] || 0)

  if (columnsType.value === 'cascader') {
    let startIndex = -1
    const nextIndexes: number[] = []
    for (let i = 0; i < columnIndexes.value.length; i++) {
      if (startIndex < 0 && columnIndexes.value[i] !== indexes[i]) {
        startIndex = i
      }
      nextIndexes.push(startIndex > -1 && i > startIndex ? 0 : indexes[i])
    }
    indexes = nextIndexes

    // 多列同时滚动时下标可能会超过当前列的长度，这里要做一个限制
    {
      const validIndexes = getCascaderValidIndexes(indexes, props.columns, optionKeys)
      if (!arrayEqual(indexes, validIndexes)) {
        indexes = validIndexes
      }
    }
  }

  const selectedOptions = getOptionsByIndexes(indexes, props.columns, optionKeys)

  if (!arrayEqual(indexes, columnIndexes.value)) {
    columnIndexes.value = indexes
  }

  const nextValue = getMaySingleValueByOptions(selectedOptions, optionKeys, props.columns)

  innerValue.value = nextValue
  emit('update:modelValue', nextValue, selectedOptions, indexes)
  emit('change', nextValue, selectedOptions, indexes)
}

const pickerClass = bem.b()
const pickerViewClass = bem.e('picker-view')
const indicatorClass = bem.e('indicator')
</script>
