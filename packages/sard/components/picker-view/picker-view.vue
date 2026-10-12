<template>
  <div :class="bem.b()">
    <div :class="bem.e('wrapper')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ComponentInternalInstance, computed, provide, reactive, ref, toRef, watch } from 'vue'
import { createBem } from '../../utils'
import {
  pickerViewContextKey,
  pickerViewProps,
  type PickerViewEmits,
  type PickerViewSlots,
} from './common'

const props = defineProps(pickerViewProps)

defineSlots<PickerViewSlots>()

const emit = defineEmits<PickerViewEmits>()

const bem = createBem('picker-view')

// ============================ value ============================
const innerValue = reactive([...props.value])

watch(
  () => props.value,
  (value) => {
    innerValue.length = value.length
    value.forEach((val, index) => {
      if (val !== innerValue[index]) {
        innerValue.splice(index, 1, val)
      }
    })
  },
)

// ============================ columns ============================
// 不使用 VNode 收集列：每个 PickerViewColumn 在 setup 时注册自身实例，
// 注册顺序即渲染（DOM）顺序，用实例身份换算出所在列的下标。
const columnInstances = ref<ComponentInternalInstance[]>([])

function registerColumn(instance: ComponentInternalInstance) {
  if (!columnInstances.value.includes(instance)) {
    columnInstances.value.push(instance)
  }
}

function unregisterColumn(instance: ComponentInternalInstance) {
  const index = columnInstances.value.indexOf(instance)
  if (index > -1) {
    columnInstances.value.splice(index, 1)
  }
}

function getItemIndex(instance: ComponentInternalInstance): number {
  return columnInstances.value.indexOf(instance)
}

const getColumnValue = (columnInstance: ComponentInternalInstance) => {
  return computed({
    get() {
      const index = getItemIndex(columnInstance)
      return innerValue[index] || 0
    },
    set(current: number) {
      const index = getItemIndex(columnInstance)
      if (index < 0) {
        return
      }
      const oldCurrent = innerValue[index]
      if (oldCurrent !== current) {
        innerValue[index] = current
        // 避免外部直接对此值进行修改
        const value = [...innerValue]
        emit('update:value', value)
        emit('change', value)
      }
    },
  })
}

// ============================ context ============================
const context = reactive({
  maskStyle: toRef(() => props.maskStyle),
  maskClass: toRef(() => props.maskClass),
  indicatorClass: toRef(() => props.indicatorClass),
  indicatorStyle: toRef(() => props.indicatorStyle),
  registerColumn,
  unregisterColumn,
  getColumnValue,
})

provide(pickerViewContextKey, context)
</script>
