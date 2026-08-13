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

// main
const useOptionKeysReturn = useOptionKeys(props)

const omittedProps = omitFormPopoutProps(props)

const { innerVisible, innerValue, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(
  props,
  emit,
  {
    onConfirmBefore() {
      if (isEmptyBinding(draftValue.value) || isEmptyArray(draftValue.value)) {
        const [initialValue, selectedOptions] = getInitialValue(props.columns, useOptionKeysReturn)
        draftValue.value = initialValue
        return [selectedOptions]
      }
    },
  },
)

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
