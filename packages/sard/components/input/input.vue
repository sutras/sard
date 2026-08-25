<template>
  <div :class="inputClass">
    <div v-if="slots.prepend" :class="bem.e('prepend')">
      <slot name="prepend"></slot>
    </div>
    <input
      v-if="type !== 'textarea'"
      ref="input"
      v-bind="commonProps"
      :type="mergedInputType"
      :inputmode="inputType.inputmode"
    />
    <textarea
      v-else
      ref="textarea"
      v-bind="commonProps"
      :inputmode="inputmode"
      :rows="rows"
    ></textarea>

    <div v-if="showAppend" :class="bem.e('append')">
      <div
        v-if="clearable"
        v-show="clearVisible"
        :class="bem.e('clear')"
        @pointerdown="onClearPointerDown"
        @touchstart="onClearTouchStart"
        @touchend="onClearTouchEnd"
        @touchcancel="onClearTouchEnd"
      >
        <XCircleFill />
      </div>
      <div v-if="mergedShowEye" :class="bem.e('eye')" @click.stop="onEyeClick">
        <Eye v-if="isPlainText" />
        <EyeSlash v-else />
      </div>
      <slot name="append"></slot>
      <div v-if="countVisible" :class="bem.e('count')">{{ textLength }} / {{ maxlength }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { clamp, createBem, formatNumber, isNullish } from '../../utils'
import { useFormContext, useFormItemContext } from '../form/common'
import {
  type InputProps,
  type InputSlots,
  type InputEmits,
  type InputExpose,
  defaultInputProps,
  type InputTargetElement,
} from './common'
import { compactContextKey } from '../compact/common'
import { useComposition, usePointerDown, useSimulatedClick } from '../../use'
import { mapInputType, resizeTextarea } from './utils'
import { Eye, EyeSlash, XCircleFill } from '@sard/icons'

const props = withDefaults(defineProps<InputProps>(), defaultInputProps)

const slots = defineSlots<InputSlots>()

const emit = defineEmits<InputEmits>()

const bem = createBem('input')

const formContext = useFormContext()
const formItemContext = useFormItemContext()
const compactContext = inject(compactContextKey, null)

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})
const isReadonly = computed(() => {
  return formContext?.readonly || props.readonly
})

const inputRef = useTemplateRef('input')
const textareaRef = useTemplateRef('textarea')
const controlRef = computed(() => inputRef.value || textareaRef.value)

const inputType = computed(() => mapInputType(props.type, props.inputmode))

// ============================ value ============================
const nativeInputValue = computed(() =>
  isNullish(props.modelValue) ? '' : String(props.modelValue),
)

const hasModelModifiers = computed(() => !!Object.keys(props.modelModifiers).length)

const setNativeInputValue = () => {
  const control = controlRef.value
  if (!control || control.value === nativeInputValue.value) return
  control.value = nativeInputValue.value
}

watch(
  () => props.modelValue,
  () => {
    nextTick(adjustTextareaSize)

    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const isNumber = computed(() => {
  return props.modelModifiers.number || props.type === 'number' || props.type === 'digit'
})

const normalizeInputValue = (value: string, trigger: 'input' | 'change') => {
  const { trim } = props.modelModifiers
  if (trim || isNumber.value) {
    value = value.trim()
  }

  if (isNumber.value) {
    const isDecimal = props.type === 'number'
    value = formatNumber(value, isDecimal, isDecimal)

    if (trigger === 'change' && value !== '') {
      if (props.min !== undefined || props.max !== undefined) {
        const adjustedValue = clamp(+value, props.min ?? -Infinity, props.max ?? Infinity)

        if (+value !== adjustedValue) {
          value = adjustedValue.toString()
        }
      }
      if (props.precision !== undefined) {
        value = (+value || 0).toFixed(props.precision)
      }
    }
  }

  if (props.formatter) {
    value = props.formatter(value, trigger)
  }

  return value
}

const onInput = (event: Event) => {
  if (isComposing.value) return

  const { lazy } = props.modelModifiers
  let { value } = event.target as InputTargetElement
  if (lazy) {
    emit('input', value)
    return
  }

  value = normalizeInputValue(value, 'input')

  if (value === nativeInputValue.value) {
    setNativeInputValue()
    return
  }

  emit('update:modelValue', value)
  emit('input', value)

  nextTick(() => {
    if (!hasModelModifiers.value) {
      setNativeInputValue()
    }
  })
}

const onChange = (event: Event) => {
  let { value } = event.target as InputTargetElement

  value = normalizeInputValue(value, 'change')

  if (props.modelModifiers.lazy || value !== nativeInputValue.value) {
    emit('update:modelValue', value)
  }
  emit('change', value)

  nextTick(() => {
    setNativeInputValue()
  })
}

const { isComposing, onCompositionStart, onCompositionUpdate, onCompositionEnd } = useComposition({
  emit,
  afterComposition: onInput,
})

onMounted(() => {
  setNativeInputValue()
  nextTick(adjustTextareaSize)
})

watch(nativeInputValue, () => {
  setNativeInputValue()
})

watch(
  () => props.type,
  () => {
    nextTick(() => {
      setNativeInputValue()
      adjustTextareaSize()
    })
  },
)

// ============================ count ============================
const textLength = computed(() => nativeInputValue.value.length)

const countVisible = computed(
  () =>
    props.showCount &&
    !!props.maxlength &&
    (props.type === 'text' || props.type === 'textarea') &&
    !isDisabled.value &&
    !isReadonly.value &&
    !props.showEye,
)

// ============================ auto height ============================
const adjustTextareaSize = () => {
  const textarea = textareaRef.value
  if (props.type === 'textarea' && textarea && props.autoHeight) {
    resizeTextarea(textarea, props.autoHeight)
  }
}

// ============================ focus ============================
const innerFocused = ref(props.focused)

watch([() => props.focused], () => {
  innerFocused.value = props.focused
})

const onFocus = (event: FocusEvent) => {
  innerFocused.value = true
  emit('focus', event)
}

const onBlur = (event: FocusEvent) => {
  innerFocused.value = false

  emit('blur', event)
  if (props.validateEvent) {
    formItemContext?.onBlur()
  }
}

// ============================ clear ============================
const clearVisible = computed(() => {
  const visibleBase =
    props.clearable && nativeInputValue.value && !isDisabled.value && !isReadonly.value

  return props.showClearOnlyFocus
    ? holdupClear.value || (innerFocused.value && visibleBase)
    : visibleBase
})

const holdupClear = ref(false)

const [onClearTouchStart, onClearTouchEnd] = useSimulatedClick({
  onTouchStart() {
    holdupClear.value = true
  },
  onTouchEnd() {
    holdupClear.value = false
  },
  onClick(event) {
    event.preventDefault()
    clear()
  },
})

const onClearPointerDown = usePointerDown(onClearTouchStart, undefined, onClearTouchEnd)

const clear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  emit('input', '')
}

// ============================ eye ============================
const isPlainText = ref(false)

const onEyeClick = () => {
  isPlainText.value = !isPlainText.value
}

const mergedInputType = computed(() => {
  if (props.type !== 'password') {
    return inputType.value.type
  }

  return isPlainText.value ? 'text' : 'password'
})

const mergedShowEye = computed(() => props.type === 'password' && props.showEye)

const showAppend = computed(() => {
  return !!slots.append || props.clearable || mergedShowEye.value || countVisible.value
})

// ============================ props ============================

const commonProps = computed(() => {
  return {
    class: bem.e('control'),
    disabled: isDisabled.value,
    readonly: isReadonly.value,
    maxlength: props.maxlength,
    onFocus,
    onBlur,
    onInput,
    onChange,
    onCompositionstart: onCompositionStart,
    onCompositionupdate: onCompositionUpdate,
    onCompositionend: onCompositionEnd,

    // native direct pass
    placeholder: props.placeholder,
    autofocus: props.autofocus,
    autocomplete: props.autocomplete,
    enterkeyhint: props.enterkeyhint,
    spellcheck: props.spellcheck,
    autocorrect: props.autocorrect,
    autocapitalize: props.autocapitalize,
  }
})

// ============================ style ============================

const inputClass = computed(() => {
  return [
    bem.b(),
    bem.m(props.type),
    bem.m('inlaid', props.inlaid),
    bem.m('borderless', props.borderless),
    bem.is('disabled', isDisabled.value),
    bem.is('readonly', isReadonly.value),
    bem.is('focused', innerFocused.value),
    bem.m(`compact-${compactContext?.direction}`, compactContext),
    bem.m('compact-block', compactContext?.block),
  ]
})

defineExpose<InputExpose>({
  focus() {
    controlRef.value?.focus()
  },
  blur() {
    controlRef.value?.blur()
  },
})
</script>
