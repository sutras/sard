<template>
  <Popup
    :visible="innerVisible"
    :overlay="false"
    :effect="effect"
    :lock-scroll="false"
    @visible-hook="onVisibleHook"
  >
    <div :class="notifyClass" :style="notifyStyle" @click="onClick">
      <StatusBar v-if="position === 'top' && statusBar" />
      <div :class="bem.e('content')">
        <slot>{{ message }}</slot>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { createBem } from '../../utils'
import { useTimeout } from '../../use'
import {
  type NotifyExpose,
  type NotifyProps,
  type NotifyEmits,
  type NotifySlots,
  defaultNotifyProps,
} from './common'
import Popup from '../popup/popup.vue'
import { type PopupProps } from '../popup/common'
import StatusBar from '../status-bar/status-bar.vue'
import type { MotionHookName } from '../motion/common'

const props = withDefaults(defineProps<NotifyProps>(), defaultNotifyProps)

const slots = defineSlots<NotifySlots>()

const emit = defineEmits<NotifyEmits>()

const bem = createBem('notify')

const effect = computed(() => {
  return {
    top: 'slide-top',
    bottom: 'slide-bottom',
  }[props.position] as PopupProps['effect']
})

const innerVisible = ref(props.visible)

const hideTimer = useTimeout()

const hide = () => {
  innerVisible.value = false
  emit('update:visible', false)
}

const reHideLater = () => {
  hideTimer.clear()

  nextTick(() => {
    if (props.timeout > 0) {
      hideTimer.set(hide, props.timeout)
    }
  })
}

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
    if (props.visible) {
      if (props.timeout > 0) {
        hideTimer.set(hide, props.timeout)
      }
    }
  },
)

const onVisibleHook = (name: MotionHookName, el: Element) => {
  emit('visible-hook', name, el)
  emit(name as any, el)
}

const onClick = (event: any) => {
  emit('click', event)
}

// ============================ style ============================
const notifyClass = computed(() => {
  return [bem.b(), bem.m(props.type), bem.m(props.position)]
})

const notifyStyle = computed(() => {
  return {
    backgroundColor: props.background,
    color: props.color,
  }
})

defineExpose<NotifyExpose>({
  reHideLater,
  cancelHide: () => {
    hideTimer.clear()
  },
})
</script>
