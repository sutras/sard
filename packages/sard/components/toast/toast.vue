<template>
  <Popup
    :visible="visible"
    :overlay="overlay"
    :transparent="transparent"
    :class="popupClass"
    :lock-scroll="false"
    effect="fade"
    @visible-hook="onVisibleHook"
  >
    <div :class="toastClass">
      <slot>
        <div v-if="showIcon" :class="iconClass">
          <slot name="icon">
            <Loading v-if="type === 'loading'" />
            <Success v-else-if="type === 'success'" />
            <Fail v-else-if="type === 'fail'" />
          </slot>
        </div>
        <div :class="bem.e('title')">
          <slot name="title">{{ title }}</slot>
        </div>
      </slot>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import { createBem } from '../../utils'
import Popup from '../popup/popup.vue'
import Loading from '../loading/loading.vue'
import { useTimeout } from '../../use'
import {
  type ToastProps,
  type ToastEmits,
  type ToastSlots,
  type ToastExpose,
  defaultToastProps,
} from './common'
import { Fail, Success } from '@sard/icons'
import type { MotionHookName } from '../motion/common'

const props = withDefaults(defineProps<ToastProps>(), defaultToastProps)

const slots = defineSlots<ToastSlots>()

const emit = defineEmits<ToastEmits>()

const bem = createBem('toast')

const showIcon = computed(() => {
  return !!(props.type !== 'text' || slots.icon)
})

const hideTimer = useTimeout()

const hide = () => {
  emit('update:visible', false)
}

const reHideLater = () => {
  hideTimer.clear()

  nextTick(() => {
    if (props.type !== 'loading' && props.timeout > 0) {
      hideTimer.set(hide, props.timeout)
    }
  })
}

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      if (props.type !== 'loading' && props.timeout > 0) {
        hideTimer.set(hide, props.timeout)
      }
    }
  },
)

const onVisibleHook = (name: MotionHookName, el: Element) => {
  emit('visible-hook', name, el)
  emit(name as any, el)
}

// ============================ style ============================
const toastClass = computed(() => {
  return [bem.b(), bem.is('text', props.type === 'text')]
})

const popupClass = computed(() => {
  return [bem.e('popup'), bem.em('popup', props.position)]
})

const iconClass = computed(() => {
  return [bem.e('icon'), bem.is('loading', props.type === 'loading')]
})

defineExpose<ToastExpose>({
  reHideLater,
  cancelHide: () => {
    hideTimer.clear()
  },
})
</script>
