<template>
  <div v-if="visible" :class="alertClass" :style="alertStyle">
    <div v-if="showIcon" :class="bem.e('icon')">
      <slot name="icon">
        <InfoCircleFill v-if="type === 'primary'" />
        <CheckCircleFill v-else-if="type === 'success'" />
        <WarningFill v-else-if="type === 'warning'" />
        <XCircleFill v-else-if="type === 'danger'" />
      </slot>
    </div>
    <div :class="bem.e('content')"><slot></slot></div>
    <div v-if="closable" :class="bem.e('close')" @click="onClose">
      <Close />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createBem } from '../../utils'
import { type AlertProps, type AlertSlots, type AlertEmits, defaultAlertProps } from './common'
import { CheckCircleFill, Close, InfoCircleFill, WarningFill, XCircleFill } from '@sard/icons'

const props = withDefaults(defineProps<AlertProps>(), defaultAlertProps)

defineSlots<AlertSlots>()

const emit = defineEmits<AlertEmits>()

const bem = createBem('alert')

// ============================ visible ============================

const visible = ref(true)

const onClose = () => {
  visible.value = false
  emit('close')
}

// ============================ style ============================
const alertClass = computed(() => {
  return [bem.b(), bem.m(props.type), bem.m('square', props.square)]
})

const alertStyle = computed(() => {
  return {
    color: props.color,
    background: props.background,
  }
})
</script>
