<template>
  <div :class="bem.b()">
    <PickerView
      :class="pickerViewClass"
      :indicator-class="indicatorClass"
      :value="columnIndexes"
      @change="onChange"
    >
      <PickerViewColumn v-for="(column, i) in renderedColumns" :key="i">
        <div v-for="(option, j) in column" :key="j" :class="bem.e('item')">
          <slot name="option" :option="option" :rowIndex="j" :columnIndex="i">
            {{ getLabel(option) }}
          </slot>
        </div>
      </PickerViewColumn>
    </PickerView>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, nextTick, ref, watch, type Ref } from 'vue'
import {
  createBem,
  nestedToMulti,
  toArray,
  arrayEqual,
  isEmptyBinding,
  isEmptyArray,
} from '../../utils'
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

// main
const useOptionKeysReturn = useOptionKeys(props)

const { aliasProps, getLabel } = useOptionKeysReturn

const columnsType = computed(() => {
  return getColumnsType(props.columns, useOptionKeysReturn)
})

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
  },
)

// columnIndexes
const columnIndexes = ref<number[]>([])

const updateColumnIndexes = () => {
  const indexes = getIndexesByValue(toArray(innerValue.value), props.columns, useOptionKeysReturn)
  if (!arrayEqual(indexes, columnIndexes.value)) {
    columnIndexes.value = indexes
  }
}

updateColumnIndexes()

watch([innerValue, () => props.columns, aliasProps], () => {
  if (!isEmptyBinding(innerValue.value) && !isEmptyArray(innerValue.value)) {
    updateColumnIndexes()
  }
})

const onChange = (value: number[]) => {
  if (!props.columns || props.columns.length === 0) {
    return
  }

  let indexes = value as number[]

  // 在H5弹出框中使用时，在初始化会触发change，值中会携带Infinity的下标。
  if (indexes.some((index) => index === Infinity)) {
    nextTick(() => {
      columnIndexes.value =
        isEmptyBinding(innerValue.value) || isEmptyArray(innerValue.value)
          ? columnIndexes.value.map(() => 0)
          : [...columnIndexes.value]
    })
    return
  }

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
      const validIndexes = getCascaderValidIndexes(indexes, props.columns, useOptionKeysReturn)
      if (!arrayEqual(indexes, validIndexes)) {
        indexes = validIndexes
      }
    }
  }

  const selectedOptions = getOptionsByIndexes(indexes, props.columns, useOptionKeysReturn)

  if (!arrayEqual(indexes, columnIndexes.value)) {
    columnIndexes.value = indexes
  }

  const nextValue = getMaySingleValueByOptions(selectedOptions, useOptionKeysReturn, props.columns)

  innerValue.value = nextValue
  emit('update:modelValue', nextValue, selectedOptions, indexes)
  emit('change', nextValue, selectedOptions, indexes)
}

// renderedColumns
const getRenderedColumns = (): T[][] => {
  switch (columnsType.value) {
    case 'single':
      return [props.columns as T[]]
    case 'multi':
      return props.columns as T[][]
    case 'cascader':
      return nestedToMulti(props.columns, toArray(innerValue.value), useOptionKeysReturn)
    default:
      return []
  }
}

const renderedColumns = ref(getRenderedColumns()) as Ref<T[][]>

const updateRenderedColumns = () => {
  renderedColumns.value = getRenderedColumns()
}

watch([() => props.columns, innerValue], ([newColumns, newValue], [oldColumns, oldValue]) => {
  if (
    newColumns !== oldColumns ||
    (newValue !== oldValue &&
      columnsType.value === 'cascader' &&
      !isEmptyBinding(newValue) &&
      !isEmptyArray(newValue))
  ) {
    updateRenderedColumns()
  }
})

watch(
  () => props.modelValue,
  () => {
    if (isEmptyBinding(props.modelValue) || isEmptyArray(props.modelValue)) {
      updateColumnIndexes()
      updateRenderedColumns()
    }
  },
)

const pickerViewClass = bem.e('picker-view')
const indicatorClass = bem.e('indicator')
</script>
