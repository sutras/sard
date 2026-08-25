<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    :show-confirm="showConfirm"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <Select v-bind="omittedProps" :model-value="draftValue" @change="onChange" @select="onSelect">
      <template v-if="slots.default" #default>
        <slot></slot>
      </template>
      <template v-if="slots.option" #option="optionProps">
        <slot name="option" v-bind="optionProps"></slot>
      </template>
      <template v-if="slots['option-label']" #option-label="labelProps">
        <slot name="option-label" v-bind="labelProps"></slot>
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

const props = withDefaults(defineProps<SelectPopoutProps>(), defaultSelectPopoutProps)

const slots = defineSlots<SelectPopoutSlots>()

const emit = defineEmits<SelectPopoutEmits>()

const omittedProps = omitFormPopoutProps(props)

const { innerVisible, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(props, emit)

const onSelect = () => {
  if (!props.multiple && !props.showConfirm) {
    onConfirm(false)
    innerVisible.value = false
  }
}

defineExpose<SelectPopoutExpose>({})
</script>
