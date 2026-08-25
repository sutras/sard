<template>
  <div :class="radioClass" @click="onClick">
    <div :class="iconClass" :style="iconStyle">
      <slot name="icon" :checked="innerChecked">
        <CheckIcon shape="circle" :type="checkIconType" :disabled="isDisabled" />
      </slot>
    </div>
    <div v-if="slots.default || label" :class="bem.e('label')">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, inject, watch, ref } from 'vue'
import { createBem } from '../../utils'
import { type RadioProps, type RadioSlots, type RadioEmits, radioContextKey } from './common'
import CheckIcon from '../check-icon/check-icon.vue'
import { useFormContext } from '../form/common'

const props = withDefaults(defineProps<RadioProps>(), {})

const slots = defineSlots<RadioSlots>()

const emit = defineEmits<RadioEmits>()

const bem = createBem('radio')

const groupContext = inject(radioContextKey, null)
const formContext = useFormContext()

const innerChecked = ref(groupContext ? groupContext.value === props.value : props.checked)

const isDisabled = computed(() => {
  return formContext?.disabled || groupContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || groupContext?.readonly || props.readonly
})

if (groupContext) {
  watch(
    () => groupContext.value,
    () => {
      innerChecked.value = groupContext.value === props.value
    },
  )
} else {
  watch(
    () => props.checked,
    () => {
      innerChecked.value = props.checked
    },
  )
}

const onClick = (event: any) => {
  if (!isDisabled.value && !isReadonly.value) {
    if (groupContext) {
      groupContext.toggle(props.value)
    } else {
      innerChecked.value = true
    }
  }
  emit('click', event)
}

provide(radioContextKey, null as any)

// ============================ style ============================
const radioClass = computed(() => {
  return [
    bem.b(),
    bem.m('checked', innerChecked.value),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
  ]
})

const checkIconType = computed(() => {
  const type = props.type ?? groupContext?.type ?? 'circle'
  return innerChecked.value ? (type === 'circle' ? 'check' : 'dot') : 'empty'
})

const iconColor = computed(() => {
  return innerChecked.value && !isDisabled.value
    ? (props.checkedColor ?? groupContext?.checkedColor)
    : undefined
})

const iconClass = computed(() => {
  return [bem.e('icon'), bem.em('icon', 'checked', innerChecked.value)]
})

const iconStyle = computed(() => {
  return {
    fontSize: props.size ?? groupContext?.size,
    color: iconColor.value,
  }
})
</script>
