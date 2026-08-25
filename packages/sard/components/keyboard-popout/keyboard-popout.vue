<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    type="compact"
    :transparent="transparent"
    :show-cancel="showCancel"
    :show-confirm="showConfirm"
    :show-divider="transparent"
    :show-shadow="showShadow"
    @cancel="emit('cancel')"
    @confirm="emit('confirm')"
    @close="emit('close')"
    @visible-hook="onVisibleHook"
  >
    <slot></slot>
    <Keyboard
      v-bind="omittedProps"
      ref="keyboardRef"
      @input="emit('input', $event)"
      @delete="emit('delete')"
      @update:mode="emit('update:mode', $event)"
    />
  </Popout>
</template>

<script setup lang="ts">
import { computed, ref, useModel } from 'vue'
import Popout from '../popout/popout.vue'
import Keyboard from '../keyboard/keyboard.vue'
import {
  type KeyboardPopoutProps,
  type KeyboardPopoutSlots,
  type KeyboardPopoutEmits,
  type KeyboardPopoutExpose,
  defaultKeyboardPopoutProps,
} from './common'
import { type KeyBoardExpose } from '../keyboard/common'
import type { MotionHookName } from '../motion/common'
import { omit } from '../../utils'

const props = withDefaults(defineProps<KeyboardPopoutProps>(), defaultKeyboardPopoutProps)

defineSlots<KeyboardPopoutSlots>()

const emit = defineEmits<KeyboardPopoutEmits>()

const omittedProps = computed(() =>
  omit(props, ['visible', 'title', 'transparent', 'showConfirm', 'showCancel', 'showShadow']),
)

const innerVisible = useModel(props, 'visible')

const keyboardRef = ref<KeyBoardExpose>()

const onVisibleHook = (name: MotionHookName, el: Element) => {
  if (name === 'enter' && props.type === 'random') {
    keyboardRef.value?.shuffle()
  }
  emit('visible-hook', name, el)
  emit(name as any, el)
}

defineExpose<KeyboardPopoutExpose>({
  shuffle() {
    keyboardRef.value?.shuffle()
  },
})
</script>
