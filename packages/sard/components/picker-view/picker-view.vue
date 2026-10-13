<template>
  <div :class="bem.b()">
    <div :class="bem.e('wrapper')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, shallowRef, toRef, watch } from 'vue'
import { createBem } from '../../utils'
import {
  pickerViewContextKey,
  pickerViewProps,
  type PickerViewColumnHandle,
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
// 不使用 VNode 收集列：每个 PickerViewColumn 在 setup 时登记一个**自建的普通对象**，
// 登记顺序即渲染（DOM）顺序，用句柄身份换算出所在列的下标。
// 用 shallowRef：这里只需身份登记、不需要深响应式。
const columnHandles = shallowRef<PickerViewColumnHandle[]>([])

function registerColumn(handle: PickerViewColumnHandle) {
  if (!columnHandles.value.includes(handle)) {
    columnHandles.value.push(handle)
  }
}

function unregisterColumn(handle: PickerViewColumnHandle) {
  const index = columnHandles.value.indexOf(handle)
  if (index > -1) {
    columnHandles.value.splice(index, 1)
  }
}

const getColumnValue = (handle: PickerViewColumnHandle) => {
  return computed({
    get() {
      return innerValue[columnHandles.value.indexOf(handle)] || 0
    },
    set(current: number) {
      const index = columnHandles.value.indexOf(handle)
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
