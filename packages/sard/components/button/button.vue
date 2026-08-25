<template>
  <button
    :type="htmlType"
    :class="buttonClass"
    :disabled="isDisabled || loading"
    @click="onClick"
    @touchstart="() => {}"
  >
    <div v-if="loading || slots.icon" :class="iconClass">
      <Loading v-if="loading" :type="loadingType" />
      <slot v-else name="icon" />
    </div>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createBem } from '../../utils'
import Loading from '../loading/loading.vue'
import { useFormContext } from '../form/common'
import { type ButtonProps, type ButtonSlots, type ButtonEmits, defaultButtonProps } from './common'
import { compactContextKey } from '../compact/common'

const props = withDefaults(defineProps<ButtonProps>(), defaultButtonProps)

const slots = defineSlots<ButtonSlots>()

const emit = defineEmits<ButtonEmits>()

const bem = createBem('button')

const formContext = useFormContext()

const compactContext = inject(compactContextKey, null)

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const onClick = (event: any) => {
  emit('click', event)
}

// ============================ style ============================

const buttonClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.size),
    bem.m(props.variant),
    bem.m(`${props.variant}-${props.color}`),
    bem.m('round', props.round),
    bem.m('square', props.square),
    bem.m('ghost', props.ghost),
    bem.is('disabled', isDisabled.value),
    bem.is('loading', props.loading),
    bem.m('block', props.block),
    bem.m('iconic', !!slots.icon || props.loading),
    bem.m(`compact-${compactContext?.direction}`, compactContext),
    bem.m('auto-height', props.autoHeight),
    bem.m('compact', props.compact),
  ]
})

const iconClass = computed(() => {
  return [bem.e('icon'), bem.has('slot', !!slots.default)]
})
</script>
