<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    :show-confirm="showConfirm"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <Cascader
      v-bind="omittedProps"
      :model-value="draftValue"
      @select="(option, tabIndex) => $emit('select', option, tabIndex)"
      @change="onChange"
    >
      <template #top="{ tabIndex }">
        <slot name="top" :tab-index="tabIndex"></slot>
      </template>
    </Cascader>
  </Popout>
</template>

<script setup lang="ts">
import Popout from '../popout/popout.vue'
import Cascader from '../cascader/cascader.vue'
import {
  type CascaderPopoutProps,
  type CascaderPopoutSlots,
  type CascaderPopoutEmits,
  defaultCascaderPopoutProps,
} from './common'
import { isEmptyBinding } from '../../utils'
import { omitFormPopoutProps, useFormPopout } from '../popout/useFormPopout'

const props = withDefaults(defineProps<CascaderPopoutProps>(), defaultCascaderPopoutProps)

defineSlots<CascaderPopoutSlots>()

const emit = defineEmits<CascaderPopoutEmits>()

// main
const omittedProps = omitFormPopoutProps(props)

const { innerVisible, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(
  props,
  emit,
  {
    onChange() {
      if (!props.showConfirm && !isEmptyBinding(draftValue.value)) {
        onConfirm(false)
        innerVisible.value = false
      }
    },
  },
)
</script>
