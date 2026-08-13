<template>
  <div ref="scroll" :class="[bem.b(), bem.is('disabled', disabled)]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, toRef, useTemplateRef, watch } from 'vue'
import { createBem, isNullish } from '../../utils'
import {
  type ScrollSpyProps,
  type ScrollSpySlots,
  type ScrollSpyEmits,
  type ScrollSpyExpose,
  scrollSpyContextKey,
} from './common'
import { useScrollSpy } from '../../use'

const props = withDefaults(defineProps<ScrollSpyProps>(), {})

defineSlots<ScrollSpySlots>()

const emit = defineEmits<ScrollSpyEmits>()

const bem = createBem('scroll-spy')

// main
const scrollRef = useTemplateRef('scroll')

const { innerCurrent, anchorRectList, register, unregister, scrollTo, update } = useScrollSpy(
  scrollRef,
  reactive({
    startOffset: toRef(() => props.offset) as unknown as number,
    defaultCurrent: props.modelValue,
    getSpiedRect() {
      return scrollRef.value!.getBoundingClientRect()
    },
    onChange(name) {
      emit('update:modelValue', name)
      emit('change', name)
    },
  }),
)

provide(scrollSpyContextKey, {
  register,
  unregister,
})

watch(
  () => props.modelValue,
  () => {
    if (
      !isNullish(props.modelValue) &&
      anchorRectList.value.find((item) => item[0] === props.modelValue) &&
      props.modelValue !== innerCurrent.value
    ) {
      innerCurrent.value = props.modelValue
      scrollTo(props.modelValue)
    }
  },
)

defineExpose<ScrollSpyExpose>({
  scrollTo,
  update,
})
</script>
