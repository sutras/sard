<template>
  <div :class="bem.b()">
    <div ref="scroll" :class="bem.e('scroll')">
      <slot></slot>
    </div>
    <IndexesNav v-model:current="innerCurrent" :anchors="anchorNames" @change="onNavChange" />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, useTemplateRef, watch } from 'vue'
import { createBem, isNullish } from '../../utils'
import {
  type IndexesProps,
  type IndexesSlots,
  type IndexesEmits,
  type IndexesExpose,
  indexesContextKey,
  defaultIndexesProps,
} from './common'
import { useScrollSpy } from '../../use'
import IndexesNav from './indexes-nav.vue'

const props = withDefaults(defineProps<IndexesProps>(), defaultIndexesProps)

defineSlots<IndexesSlots>()

const emit = defineEmits<IndexesEmits>()

const bem = createBem('indexes')

// main
const scrollRef = useTemplateRef('scroll')

const { innerCurrent, anchorRectList, register, unregister, scrollTo, update } = useScrollSpy(
  scrollRef,
  {
    defaultCurrent: props.current,
    getSpiedRect() {
      return scrollRef.value!.getBoundingClientRect()
    },
    onChange(name) {
      emit('change', name)
    },
  },
)

provide(indexesContextKey, {
  register,
  unregister,
})

watch(
  () => props.current,
  () => {
    if (
      !isNullish(props.current) &&
      anchorNames.value.includes(props.current) &&
      props.current !== innerCurrent.value
    ) {
      innerCurrent.value = props.current
      scrollTo(props.current)
    }
  },
)

// nav
const anchorNames = computed(() => {
  return anchorRectList.value.map((item) => item[0])
})

const onNavChange = (name: string | number) => {
  scrollTo(name)
  emit('change', name)
}

defineExpose<IndexesExpose>({
  scrollTo,
  update,
})
</script>
