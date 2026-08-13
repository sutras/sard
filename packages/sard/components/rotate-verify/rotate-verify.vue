<template>
  <div :class="bem.b()">
    <img :class="bem.e('image')" :style="imageStyle" :src="src" />
    <SlideVerify
      ref="slideVerifyRef"
      :target-pos="targetPos"
      :text="text"
      :success-text="successText"
      :error-text="errorText"
      :disabled="disabled"
      :reset-when-error="resetWhenError"
      :show-target="showTarget"
      :verify="verify"
      @start="emit('start', $event)"
      @move="emit('move', $event)"
      @end="emit('end', $event)"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createBem } from '../../utils'
import {
  type RotateVerifyProps,
  type RotateVerifySlots,
  type RotateVerifyEmits,
  type RotateVerifyExpose,
  defaultRotateVerifyProps,
} from './common'
import SlideVerify from '../slide-verify/slide-verify.vue'
import { type SlideVerifyExpose } from '../slide-verify/common'

const props = withDefaults(defineProps<RotateVerifyProps>(), defaultRotateVerifyProps)

defineSlots<RotateVerifySlots>()

const emit = defineEmits<RotateVerifyEmits>()

const bem = createBem('rotate-verify')

// main
const percent = ref(0)
const targetDegree = computed(() => ((props.targetPos ?? 100) / 100) * 360)
const slideDegree = computed(() => (percent.value / 100) * 360)

const onChange = (value: number) => {
  percent.value = value
  emit('change', value)
}

const slideVerifyRef = ref<SlideVerifyExpose>()

const reset = () => {
  slideVerifyRef.value?.reset()
}

// others
defineExpose<RotateVerifyExpose>({ reset })

const imageStyle = computed(() => {
  return {
    transform: `rotate(${targetDegree.value}deg) rotate(${-slideDegree.value}deg)`,
  }
})
</script>
