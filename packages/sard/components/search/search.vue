<template>
  <form :class="searchClass" :style="searchStyle" @click="onClick" @submit="onSubmit">
    <div v-if="slots.prepend" :class="bem.e('prepend')">
      <slot name="prepend"></slot>
    </div>
    <div :class="bem.e('input-wrapper')">
      <Input
        ref="input"
        type="search"
        inputmode="search"
        :model-value="innerValue"
        clearable
        showClearOnlyFocus
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeholder"
        borderless
        :class="inputClass"
        :style="inputStyle"
        :focus="focus"
        @update:modelValue="onInput"
        @change="onChange"
        @search="onConfirm"
        @clear="onClear"
        @focus="onFocus"
        @blur="onBlur"
      >
        <template #prepend>
          <slot name="input-prepend">
            <Search :class="bem.e('icon')" />
          </slot>
        </template>
        <template v-if="slots['input-append']" #append>
          <slot name="input-append"></slot>
        </template>
      </Input>
    </div>
    <div v-if="cancel || search || slots.append" :class="bem.e('append')">
      <Button v-if="cancel" variant="link" auto-height @click="onCancel">
        {{ cancel }}
      </Button>
      <Button v-if="search" variant="link" auto-height @click="onConfirm">
        {{ search }}
      </Button>
      <slot name="append"></slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, useModel, useTemplateRef, watch } from 'vue'
import { createBem } from '../../utils'
import Input from '../input/input.vue'
import Button from '../button/button.vue'
import {
  type SearchProps,
  type SearchSlots,
  type SearchEmits,
  defaultSearchProps,
  type SearchExpose,
} from './common'
import { Search } from '@sard/icons'

const props = withDefaults(defineProps<SearchProps>(), defaultSearchProps)

const slots = defineSlots<SearchSlots>()

const emit = defineEmits<SearchEmits>()

const bem = createBem('search')

const innerValue = useModel(props, 'modelValue')

const onInput = (value: string | number) => {
  innerValue.value = value as string
  emit('input', value as string)
}

const onChange = (value: string | number) => {
  emit('change', value as string)
}

const onConfirm = () => {
  emit('search', innerValue.value)
}

const onSubmit = (event: SubmitEvent) => {
  event.preventDefault()
  onConfirm()
}

const onCancel = () => {
  innerValue.value = ''
  emit('cancel')
}

const onClick = (event: any) => {
  emit('click', event)
}

const onClear = () => {
  emit('clear')
}

const onFocus = (event: any) => {
  emit('focus', event)
}

const onBlur = (event: any) => {
  emit('blur', event)
}

// ============================ style ============================
const searchClass = computed(() => {
  return [
    bem.b(),
    bem.m('show-action', props.cancel || props.search),
    bem.m('disabled', props.disabled),
  ]
})

const searchStyle = computed(() => {
  return {
    backgroundColor: props.background,
  }
})

const inputClass = computed(() => {
  return [bem.e('input'), bem.em('input', props.shape)]
})

const inputStyle = computed(() => {
  return {
    textAlign: props.align,
    color: props.inputColor,
    backgroundColor: props.inputBackground,
  }
})

const inputRef = useTemplateRef('input')

defineExpose<SearchExpose>({
  focus() {
    inputRef.value?.focus()
  },
  blur() {
    inputRef.value?.blur()
  },
})
</script>
