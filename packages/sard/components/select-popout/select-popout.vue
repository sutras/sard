<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    :show-confirm="showConfirm"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <Select
      ref="select"
      v-bind="omittedProps"
      :model-value="draftValue"
      @change="onChange"
      @select="onSelect"
      @update:filter-value="onUpdateFilterValue"
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
      <template v-if="slots.bottom" #bottom>
        <slot name="bottom"></slot>
      </template>
    </Select>
  </Popout>
</template>

<script setup lang="ts">
import {
  type SelectPopoutProps,
  type SelectPopoutSlots,
  type SelectPopoutEmits,
  type SelectPopoutExpose,
  defaultSelectPopoutProps,
} from './common'
import { omitFormPopoutProps, useFormPopout } from '../popout/useFormPopout'
import Popout from '../popout/popout.vue'
import Select from '../select/select.vue'
import { useTemplateRef } from 'vue'

const props = withDefaults(defineProps<SelectPopoutProps>(), defaultSelectPopoutProps)

const slots = defineSlots<SelectPopoutSlots>()

const emit = defineEmits<SelectPopoutEmits>()

const omittedProps = omitFormPopoutProps(props)

const { innerVisible, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(props, emit)

const onSelect = (value: any) => {
  if (!props.multiple && !props.showConfirm) {
    onConfirm(false)
    innerVisible.value = false
  }
  emit('select', value)
}

const onUpdateFilterValue = (value: string) => {
  emit('update:filterValue', value)
}

const selectRef = useTemplateRef('select')

defineExpose<SelectPopoutExpose>({
  scrollTop: () => {
    selectRef.value?.scrollTop()
  },
})
</script>
