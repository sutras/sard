<template>
  <div class="relative box-border" :style="{ paddingTop }">
    <div
      class="absolute inset-0 flex justify-center items-center"
      :style="{ background: cssVar('fill-color') }"
    >
      <span>{{ meta.width }}</span>
      <span>x</span>
      <span>{{ meta.height }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeout } from '../../../use'
import { cssVar, random } from '../../../utils'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  meta: {
    width: number
    height: number
  }
}>()

const emit = defineEmits<{
  (
    e: 'load',
    event: {
      target: {
        naturalWidth: number
        naturalHeight: number
      }
    },
  ): void
}>()

defineSlots<{
  default?: () => any
}>()

const internalWidth = ref(320)
const internalHeight = ref(240)

const currWidth = computed(() => internalWidth.value)
const currHeight = computed(() => internalHeight.value)

const paddingTop = computed(() => (currHeight.value / currWidth.value) * 100 + '%')

const sizeTimer = useTimeout()

onMounted(() => {
  sizeTimer.set(
    () => {
      internalWidth.value = props.meta.width
      internalHeight.value = props.meta.height
      emit('load', {
        target: {
          naturalWidth: props.meta.width,
          naturalHeight: props.meta.height,
        },
      })
    },
    random(50, 150),
  )
})
</script>
