<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    @confirm="onConfirm"
    @enter="onEnter"
    @visible-hook="onVisibleHook"
  >
    <Picker v-bind="omittedProps" :model-value="draftValue" @change="onChange">
      <template v-if="slots.option" #option="optionProps">
        <slot name="option" v-bind="optionProps"></slot>
      </template>
    </Picker>
  </Popout>
</template>

<script setup lang="ts" generic="T">
import Popout from '../popout/popout.vue'
import Picker from '../picker/picker.vue'
import {
  type PickerPopoutProps,
  type PickerPopoutSlots,
  type PickerPopoutEmits,
  defaultPickerPopoutProps,
} from './common'
import { isEmptyArray, isEmptyBinding } from '../../utils'
import { getInitialValue } from '../picker/common'
import { omitFormPopoutProps, useFormPopout } from '../popout/useFormPopout'
import { useOptionKeys } from '../../use'

const props = withDefaults(defineProps<PickerPopoutProps<T>>(), defaultPickerPopoutProps)

const slots = defineSlots<PickerPopoutSlots<T>>()

const emit = defineEmits<PickerPopoutEmits>()

const optionKeys = useOptionKeys(props)

const omittedProps = omitFormPopoutProps(props)

const { hasChange, innerVisible, innerValue, draftValue, onChange, onConfirm, onVisibleHook } =
  useFormPopout(props, emit, {
    onConfirmBefore() {
      if (!hasChange.value || isEmptyBinding(draftValue.value) || isEmptyArray(draftValue.value)) {
        const [initialValue, selectedOptions, indexes] = getInitialValue(props.columns, optionKeys)
        draftValue.value = initialValue
        return [selectedOptions, indexes]
      }
    },
  })

const onEnter = () => {
  if (
    !isEmptyBinding(innerValue.value) &&
    !isEmptyArray(innerValue.value) &&
    draftValue.value !== innerValue.value
  ) {
    draftValue.value = innerValue.value
  }
}
</script>
