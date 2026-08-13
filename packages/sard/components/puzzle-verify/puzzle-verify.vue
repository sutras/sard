<template>
  <div :class="puzzleVerifyClass" :style="puzzleVerifyStyle">
    <div :class="bem.e('frame')">
      <img :class="bem.e('whole')" :src="src" @load="onLoad" />
      <div :class="bem.e('hollow')"></div>
      <div :class="bem.e('piece')">
        <img mode="widthFix" :class="bem.e('piece-img')" :src="src" />
        <div :class="bem.e('piece-shadow')"></div>
      </div>
    </div>

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
      @start="onStart"
      @move="emit('move', $event)"
      @end="onEnd"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createBem, clamp, random } from '../../utils'
import {
  type PuzzleVerifyProps,
  type PuzzleVerifySlots,
  type PuzzleVerifyEmits,
  type PuzzleVerifyExpose,
  defaultPuzzleVerifyProps,
} from './common'
import SlideVerify from '../slide-verify/slide-verify.vue'
import { type SlideVerifyExpose } from '../slide-verify/common'

const props = withDefaults(defineProps<PuzzleVerifyProps>(), defaultPuzzleVerifyProps)

defineSlots<PuzzleVerifySlots>()

const emit = defineEmits<PuzzleVerifyEmits>()

const bem = createBem('puzzle-verify')

// main
const defaultAspectRatio = 320 / 240
const aspectRatio = ref(props.aspectRatio || defaultAspectRatio)

const onLoad = (event: Event) => {
  const { naturalWidth, naturalHeight } = event.target as HTMLImageElement
  aspectRatio.value = naturalWidth / naturalHeight || defaultAspectRatio
}

const percent = ref(0)

const onChange = (value: number) => {
  percent.value = value
  emit('change', value)
}

const y = ref(random(20, 80))

const targetPos = computed(() => {
  return clamp(props.targetPos ?? 100, 0, 100)
})

const slideVerifyRef = ref<SlideVerifyExpose>()

const reset = () => {
  slideVerifyRef.value?.reset()
  y.value = random(20, 80)
}

const isDown = ref(false)

const onStart = (event: any) => {
  emit('start', event)
  isDown.value = true
}
const onEnd = (event: any) => {
  emit('end', event)
  isDown.value = false
}

// others
defineExpose<PuzzleVerifyExpose>({ reset })

const puzzleVerifyClass = computed(() => {
  return [bem.b(), bem.m('down', isDown.value)]
})

const puzzleVerifyStyle = computed(() => {
  return {
    '--y': y.value / 100,
    '--actual-x': percent.value / 100,
    '--target-x': targetPos.value / 100,
    '--padding-top': (1 / aspectRatio.value) * 100 + '%',
  }
})
</script>
