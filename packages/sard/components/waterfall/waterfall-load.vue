<template>
  <div :class="bem.b()" :style="waterfallLoadStyle">
    <div :class="bem.e('content')">
      <slot :on-load="onLoad" :overtime="overtime"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { createBem } from '../../utils'
import {
  type WaterfallLoadProps,
  type WaterfallLoadSlots,
  type WaterfallLoadEmits,
  type WaterfallLoadExpose,
} from './common'
import { useTimeout } from '../../use'

const props = withDefaults(defineProps<WaterfallLoadProps>(), {})

defineSlots<WaterfallLoadSlots>()

const emit = defineEmits<WaterfallLoadEmits>()

const bem = createBem('waterfall-load')

// main
let loaded = false

const overtime = ref(false)

const currWidth = ref(props.width || 320)
const currHeight = ref(props.height || 240)

const paddingTop = computed(() => (currHeight.value / currWidth.value) * 100 + '%')

const loadTimer = useTimeout()

const onLoad = (event: Event) => {
  loaded = true
  if (!overtime.value) {
    const { naturalWidth, naturalHeight } = event.target as HTMLImageElement
    if (naturalWidth && naturalHeight) {
      currWidth.value = naturalWidth
      currHeight.value = naturalHeight
    }
    emit('load')
  }
}

onMounted(() => {
  loadTimer.set(() => {
    if (!loaded) {
      overtime.value = true
      emit('load')
    }
  }, props.maxWait || 0)
})

// others
defineExpose<WaterfallLoadExpose>({})

const waterfallLoadStyle = computed(() => {
  return {
    paddingTop: paddingTop.value,
  }
})
</script>
