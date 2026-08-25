<template>
  <div ref="item" :class="waterfallItemClass" :style="waterfallItemStyle">
    <slot :on-load="onLoad" :column-width="context.columnWidth"></slot>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
  reactive,
  ref,
  watch,
  useTemplateRef,
} from 'vue'
import { createBem } from '../../utils'
import {
  type WaterfallItemProps,
  type WaterfallItemSlots,
  type WaterfallItemEmits,
  type WaterfallItemExpose,
  type WaterfallMember,
} from './common'
import { waterfallContextKey } from './common'
import { useTimeout } from '../../use'

withDefaults(defineProps<WaterfallItemProps>(), {})

defineSlots<WaterfallItemSlots>()

defineEmits<WaterfallItemEmits>()

const bem = createBem('waterfall-item')

const itemRef = useTemplateRef('item')

const member = reactive<WaterfallMember>({
  loaded: false,
  visible: false,
  height: 0,
  top: 0,
  left: 0,
  beforeReflow: () => {
    updateHeight()
  },
})

const updateHeight = () => {
  if (itemRef.value) {
    member.height = itemRef.value.getBoundingClientRect().height
  }
}

const context = inject(waterfallContextKey)!

const onLoad = () => {
  if (!member.loaded) {
    member.loaded = true
    context.onItemLoad()
  }
}

onMounted(() => {
  context.addMember(member)
})

onBeforeUnmount(() => {
  context.removeMember(member)
})

// ============================ visible ============================
const laterVisible = ref(false)

const visibleTimer = useTimeout()

watch(
  () => member.visible,
  () => {
    if (member.visible) {
      visibleTimer.set(() => {
        laterVisible.value = true
      }, 100)
    } else {
      laterVisible.value = false
    }
  },
)

// ============================ style ============================

const waterfallItemClass = computed(() => {
  return [bem.b(), bem.m('show', member.visible), bem.is('entering', !laterVisible.value)]
})

const waterfallItemStyle = computed(() => {
  return [
    {
      width: context.columnWidth + 'px',
      '--x': member.left + 'px',
      '--y': member.top + 'px',
    },
  ]
})

defineExpose<WaterfallItemExpose>({})
</script>
