<template>
  <div :class="switchClass" :style="switchStyle" @click="onClick">
    <div :class="bem.e('thumb')">
      <Loading v-if="innerLoading" size="0.5em" />
    </div>
    <div :class="bem.e('text')">
      <div :class="bem.e('text-checked')">
        <slot name="checked-text">{{ checkedText }}</slot>
      </div>
      <div :class="bem.e('text-unchecked')">
        <slot name="unchecked-text">{{ uncheckedText }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { createBem, cssVarName } from '../../utils'
import Loading from '../loading/loading.vue'
import { useFormContext, useFormItemContext } from '../form/common'
import { type SwitchProps, type SwitchEmits, type SwitchSlots, defaultSwitchProps } from './common'

const props = withDefaults(defineProps<SwitchProps>(), defaultSwitchProps)

defineSlots<SwitchSlots>()

const emit = defineEmits<SwitchEmits>()

const bem = createBem('switch')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const innerLoading = ref(props.loading)

watch(
  () => props.loading,
  () => {
    innerLoading.value = props.loading
  },
)

const isChecked = computed(() => {
  return innerValue.value === props.checkedValue
})

const onClick = async (event: any) => {
  emit('click', event)

  if (isDisabled.value || isReadonly.value || innerLoading.value) {
    return
  }

  const nextValue =
    innerValue.value === props.checkedValue ? props.uncheckedValue : props.checkedValue

  if (props.beforeUpdate) {
    try {
      innerLoading.value = true
      await props.beforeUpdate(nextValue)
    } catch {
      return
    } finally {
      innerLoading.value = false
    }
  }

  innerValue.value = nextValue
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}

const switchClass = computed(() => {
  return [
    bem.b(),
    bem.m('checked', isChecked.value),
    bem.m('readonly', isReadonly.value),
    bem.m('disabled', isDisabled.value),
    bem.m('loading', innerLoading.value),
  ]
})

const switchStyle = computed(() => {
  return {
    [cssVarName('switch-size')]: props.size,
    backgroundColor: isChecked.value ? props.checkedColor : props.uncheckedColor,
  }
})
</script>
