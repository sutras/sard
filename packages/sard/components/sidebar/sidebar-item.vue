<template>
  <div ref="item" :class="sidebarItemClass" @click="onClick">
    <div v-if="isCurrent && context.round" :class="bem.e('round-top')"></div>
    <div v-if="isCurrent && context.line" :class="bem.e('line')"></div>
    <slot>
      <div :class="bem.e('title')">
        {{ title }}
      </div>
    </slot>
    <div v-if="isCurrent && context.round" :class="bem.e('round-bottom')"></div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  toRef,
  useTemplateRef,
} from 'vue'
import { createBem } from '../../utils'
import {
  type SidebarItemProps,
  type SidebarItemSlots,
  type SidebarItemEmits,
  type SidebarItemExpose,
  type SidebarMember,
} from './common'
import { sidebarContextKey } from './common'

const props = withDefaults(defineProps<SidebarItemProps>(), {})

defineSlots<SidebarItemSlots>()

const emit = defineEmits<SidebarItemEmits>()

const bem = createBem('sidebar-item')

// main
const context = inject(sidebarContextKey)

if (!context) {
  throw new Error('SidebarItem must be included in Sidebar.')
}

const isCurrent = computed(() => {
  return context.current === props.name
})

const itemRef = useTemplateRef('item')

const member = reactive({
  el: itemRef,
  name: toRef(() => props.name),
})

const select = () => {
  context.select(member)
}

const onClick = (event: any) => {
  emit('click', event)

  if (!props.disabled) {
    select()
  }
}

onMounted(() => {
  context.addMember(member)
  if (isCurrent.value) {
    nextTick(() => {
      select()
    })
  }
})

onUnmounted(() => {
  context.removeMember(member)
})

// others
const sidebarItemClass = computed(() => {
  return [bem.b(), bem.is('current', isCurrent.value), bem.is('disabled', props.disabled)]
})

defineExpose<SidebarItemExpose>({})
</script>
