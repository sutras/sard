<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    :show-confirm="showConfirm"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <div :class="bem.e('content')">
      <ColorPicker
        v-bind="omittedProps"
        :validate-event="false"
        :model-value="draftValue"
        @change="onChange"
      />
    </div>
  </Popout>
</template>

<script setup lang="ts">
import ColorPicker from '../color-picker/color-picker.vue'
import Popout from '../popout/popout.vue'
import {
  type ColorPickerPopoutProps,
  type ColorPickerPopoutSlots,
  type ColorPickerPopoutEmits,
  type ColorPickerPopoutExpose,
  defaultColorPickerPopoutProps,
} from './common'
import { omitFormPopoutProps, useFormPopout } from '../popout/useFormPopout'
import { createBem, defaultColorPickerValue, isEmptyBinding } from '../../utils'

const props = withDefaults(defineProps<ColorPickerPopoutProps>(), defaultColorPickerPopoutProps)

defineSlots<ColorPickerPopoutSlots>()

const emit = defineEmits<ColorPickerPopoutEmits>()

const bem = createBem('color-picker-popout')

const omittedProps = omitFormPopoutProps(props)

const { innerVisible, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(
  props,
  emit,
  {
    onConfirmBefore() {
      if (isEmptyBinding(draftValue.value)) {
        draftValue.value = defaultColorPickerValue
      }
    },
  },
)

defineExpose<ColorPickerPopoutExpose>({})
</script>
