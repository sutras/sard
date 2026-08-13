<template>
  <div ref="tab" :class="tabClass" @click="onClick">
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, useTemplateRef, reactive, toRef, onMounted } from 'vue'
import { createBem } from '../../utils'
import {
  type TabProps,
  type TabSlots,
  type TabEmits,
  tabContextKey,
  type TabMember,
} from '../tabs/common'

const props = withDefaults(defineProps<TabProps>(), {})

defineSlots<TabSlots>()

const emit = defineEmits<TabEmits>()

const bem = createBem('tabs')

// main
const context = inject(tabContextKey)

if (!context) {
  throw new Error('Tab must be included in Tabs.')
}

const isActive = computed(() => {
  return context.value === props.value
})

const tabRef = useTemplateRef('tab')

const member = reactive<TabMember>({
  el: tabRef as unknown as HTMLElement,
  value: toRef(() => props.value),
})

const onClick = (event: any) => {
  emit('click', event)
  if (!props.disabled) {
    context.select(member)
  }
}

onMounted(() => {
  context.addMember(member)
})

onUnmounted(() => {
  context.removeMember(member)
})

// others
const tabClass = computed(() => {
  return [bem.e('tab'), bem.is('active', isActive.value), bem.is('disabled', props.disabled)]
})
</script>
