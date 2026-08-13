<template>
  <div ref="root" :class="imageClass" :style="imageStyle" @click="onClick">
    <div v-if="showLoading && status & STATUS.FIRST_LOADING" :class="bem.e('loading')">
      <slot name="loading">
        <Image />
      </slot>
    </div>
    <div v-else-if="showError && status & STATUS.ERROR" :class="bem.e('error')">
      <slot name="error">
        <ImageError />
      </slot>
    </div>
    <div
      v-else
      :class="bem.e('display')"
      :style="displayStyle"
      @animationend="isAnimationEnd = true"
    ></div>

    <img
      ref="image"
      :src="src"
      :loading="loading"
      :class="bem.e('interaction')"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { createBem } from '../../utils'
import {
  type ImageProps,
  type ImageSlots,
  type ImageEmits,
  type ImageExpose,
  defaultImageProps,
  IMAGE_MODES,
} from './common'
import { useResizeObserver } from '../../use'
import { Image, ImageError } from '@sard/icons'

const props = withDefaults(defineProps<ImageProps>(), defaultImageProps)

const slots = defineSlots<ImageSlots>()

const emit = defineEmits<ImageEmits>()

const bem = createBem('image')

// main
enum STATUS {
  UNSTATED = 0,
  FIRST_LOADING = 1 << 0,
  LATER_LOADING = 1 << 2,
  LOADED = 1 << 3,
  ERROR = 1 << 4,
}
const status = ref<STATUS>(STATUS.UNSTATED)
const isLoaded = ref(false)

const isAnimationEnd = ref(false)

const rootRef = useTemplateRef('root')

const sensorSize = useResizeObserver(rootRef)

const aspectRatio = ref(0)

const loadedUrl = ref('')

const imageRef = useTemplateRef('image')

const doLoad = (event: Event) => {
  const img = imageRef.value
  if (!img) return
  const { naturalWidth, naturalHeight } = img
  aspectRatio.value = naturalWidth / naturalHeight
  status.value = STATUS.LOADED
  isLoaded.value = true
  loadedUrl.value = props.src
  emit('load', event)
}

const onLoad = async (event: Event) => {
  if (!props.customLoad) {
    doLoad(event)
  }
}

const onError = (event: Event) => {
  status.value = STATUS.ERROR
  emit('error', event)
}

const onClick = (event: any) => {
  emit('click', event)
}

watch(
  () => props.src,
  async () => {
    if (props.src) {
      status.value =
        isLoaded.value && !(status.value & STATUS.ERROR)
          ? STATUS.LATER_LOADING
          : STATUS.FIRST_LOADING
    }
    if (props.customLoad) {
      props.customLoad((event) => {
        doLoad(event)
      })
    }
  },
  {
    immediate: true,
  },
)

// others
defineExpose<ImageExpose>({})

const imageClass = computed(() => {
  return [bem.b(), bem.m(props.shape), bem.m('animated', props.fade && !isAnimationEnd.value)]
})

const imageStyle = computed(() => {
  return {
    width:
      status.value & STATUS.LOADED && props.mode === 'heightFix'
        ? aspectRatio.value * sensorSize.height + 'px'
        : props.width,
    height:
      status.value & STATUS.LOADED && props.mode === 'widthFix'
        ? sensorSize.width / aspectRatio.value + 'px'
        : props.height,
    borderRadius: props.shape === 'square' ? props.radius : undefined,
    background: status.value & STATUS.LOADED ? 'transparent' : props.background,
  }
})

const displayStyle = computed(() => {
  return {
    backgroundImage: loadedUrl.value ? `url(${loadedUrl.value})` : 'none',
    backgroundPosition: IMAGE_MODES[props.mode][0],
    backgroundSize: IMAGE_MODES[props.mode][1],
  }
})
</script>
