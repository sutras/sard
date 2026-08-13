<template>
  <div :class="passwordInputClass" :style="passwordInputStyle">
    <div
      v-for="item in items"
      :key="item.index"
      :class="[bem.e('item'), bem.em('item', 'active', item.active)]"
    >
      <template v-if="item.index < nativeInputValue.length">
        <div v-if="plainText" :class="bem.e('plaintext')">
          {{ nativeInputValue[item.index] }}
        </div>
        <div v-else :class="bem.e('ciphertext')"></div>
      </template>
      <div
        v-if="innerFocused && item.index === nativeInputValue.length"
        :class="bem.e('cursor')"
      ></div>
    </div>

    <div v-if="!customKeyboard" :class="bem.e('input-wrapper')">
      <input
        ref="input"
        type="text"
        inputmode="numeric"
        :class="bem.e('input')"
        :disabled="isDisabled || isReadonly"
        :maxlength="length"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @click="toEnd"
        @keyup="toEnd"
        @select="toEnd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { createBem, isNullish } from '../../utils'
import { useFormContext, useFormItemContext } from '../form/common'
import {
  type PasswordInputProps,
  type PasswordInputEmits,
  defaultPasswordInputProps,
} from './common'

const props = withDefaults(defineProps<PasswordInputProps>(), defaultPasswordInputProps)

const emit = defineEmits<PasswordInputEmits>()

const bem = createBem('password-input')

// main
const formContext = useFormContext()
const formItemContext = useFormItemContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

const inputRef = useTemplateRef('input')

const normalizeInputValue = (value: string) => {
  return value.replace(/[^\d]/g, '')
}

const toEnd = () => {
  const el = inputRef.value!
  el.setSelectionRange(el.value.length, el.value.length)
}

// value
const nativeInputValue = computed(() =>
  isNullish(props.modelValue) ? '' : normalizeInputValue(String(props.modelValue)),
)

const setNativeInputValue = () => {
  const input = inputRef.value
  if (!input || input.value === nativeInputValue.value) return
  input.value = nativeInputValue.value
}

const onInput = (event: InputEvent) => {
  let { value } = event.target as HTMLInputElement

  value = normalizeInputValue(value)

  if (value === nativeInputValue.value) {
    setNativeInputValue()
    return
  }

  emit('update:modelValue', value)
  emit('change', value)

  nextTick(() => {
    setNativeInputValue()
  })
}

onMounted(() => {
  setNativeInputValue()
})

watch(nativeInputValue, () => {
  nextTick(() => {
    setNativeInputValue()
  })
})

watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

// focus
const innerFocused = ref(props.focused)

watch(
  () => props.focused,
  () => {
    innerFocused.value = props.focused
  },
)

const onFocus = (event: FocusEvent) => {
  toEnd()
  innerFocused.value = true
  emit('update:focused', true)
  emit('focus', event)
}

const onBlur = (event: FocusEvent) => {
  innerFocused.value = false
  emit('update:focused', false)
  emit('blur', event)

  if (props.validateEvent) {
    formItemContext?.onBlur()
  }
}

const items = computed(() => {
  const valueLength = nativeInputValue.value.length

  return Array(props.length)
    .fill(0)
    .map((_, i) => {
      return {
        index: i,
        active:
          innerFocused.value &&
          (i === valueLength || (i === valueLength - 1 && i === props.length - 1)),
      }
    })
})

// others
const isTight = computed(() => {
  return props.gap === 0 || (typeof props.gap === 'string' && parseInt(props.gap) === 0)
})

const passwordInputClass = computed(() => {
  return [
    bem.b(),
    bem.m('readonly', isReadonly.value),
    bem.m('disabled', isDisabled.value),
    bem.m(props.type, !isTight.value),
    bem.m(`tight-${props.type}`, isTight.value),
  ]
})

const passwordInputStyle = computed(() => {
  return {
    gap: props.gap,
  }
})
</script>
