<template>
  <div :class="checkboxClass" @click="onClick">
    <div :class="iconClass" :style="iconStyle">
      <slot name="icon" :checked="innerChecked">
        <CheckIcon :shape="checkIconShape" :type="checkIconType" :disabled="isDisabled" />
      </slot>
    </div>
    <div v-if="slots.default || label" :class="bem.e('label')">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, inject, ref, watch } from 'vue'
import { createBem } from '../../utils'
import {
  type CheckboxProps,
  type CheckboxSlots,
  type CheckboxEmits,
  checkboxContextKey,
  defaultCheckboxProps,
} from './common'
import CheckIcon from '../check-icon/check-icon.vue'
import { useFormContext, useFormItemContext } from '../form/common'

const props = withDefaults(defineProps<CheckboxProps>(), defaultCheckboxProps)

const slots = defineSlots<CheckboxSlots>()

const emit = defineEmits<CheckboxEmits>()

const bem = createBem('checkbox')

const groupContext = inject(checkboxContextKey, null)
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || groupContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || groupContext?.readonly || props.readonly
})

const innerChecked = ref(groupContext ? groupContext.value.includes(props.value) : props.checked)

if (groupContext) {
  watch(
    () => groupContext.value,
    () => {
      innerChecked.value = groupContext.value.includes(props.value)
    },
  )
} else {
  watch(
    () => props.checked,
    () => {
      innerChecked.value = props.checked
    },
  )
  watch(innerChecked, () => {
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  })
}

const onClick = (event: any) => {
  if (!isDisabled.value && !isReadonly.value) {
    if (groupContext) {
      groupContext.toggle(props.value)
    } else {
      innerChecked.value = !innerChecked.value
      emit('update:checked', innerChecked.value)
      emit('change', innerChecked.value)
    }
  }
  emit('click', event)
}

provide(checkboxContextKey, null as any)

// ============================ style ============================

const checkboxClass = computed(() => {
  return [
    bem.b(),
    bem.m('checked', innerChecked.value),
    bem.m('disabled', isDisabled.value),
    bem.m('readonly', isReadonly.value),
  ]
})

const checkIconShape = computed(() => {
  return props.type ?? groupContext?.type ?? 'square'
})

const checkIconType = computed(() => {
  return innerChecked.value ? 'check' : props.indeterminate ? 'dash' : 'empty'
})

const iconColor = computed(() => {
  return innerChecked.value && !isDisabled.value
    ? (props.checkedColor ?? groupContext?.checkedColor)
    : undefined
})

const iconClass = computed(() => {
  return [
    bem.e('icon'),
    bem.em('icon', 'checked', innerChecked.value),
    bem.em('icon', 'indeterminate', props.indeterminate),
  ]
})

const iconStyle = computed(() => {
  return {
    fontSize: props.size ?? groupContext?.size,
    color: iconColor.value,
  }
})
</script>
