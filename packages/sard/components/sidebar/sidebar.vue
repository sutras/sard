<template>
  <div ref="scroll" :class="bem.b()">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, ref, toRef, useTemplateRef, watch } from 'vue'
import { createBem, isNullish, scrollToTarget } from '../../utils'
import {
  type SidebarProps,
  type SidebarSlots,
  type SidebarEmits,
  type SidebarExpose,
  sidebarContextKey,
  type SidebarMember,
} from './common'

const props = withDefaults(defineProps<SidebarProps>(), {})

defineSlots<SidebarSlots>()

const emit = defineEmits<SidebarEmits>()

const bem = createBem('sidebar')

const innerCurrent = ref(props.modelValue)

const members = reactive<SidebarMember[]>([])

const scrollRef = useTemplateRef('scroll')

const scrollIntoView = (name: string | number) => {
  const member = members.find((member) => member.name === name)

  if (!member) {
    return
  }

  scrollToTarget(scrollRef.value!, member.el!, {
    ...props.scrollIntoViewOptions,
    vertical: true,
  })
}

watch(
  () => props.modelValue,
  () => {
    if (!isNullish(props.modelValue) && props.modelValue !== innerCurrent.value) {
      innerCurrent.value = props.modelValue
      scrollIntoView(props.modelValue)
    }
  },
)

const context = reactive({
  current: innerCurrent,
  round: toRef(() => props.round),
  line: toRef(() => props.line),
  addMember(member: SidebarMember) {
    if (!members.includes(member)) {
      members.push(member)
    }
  },
  removeMember(member: SidebarMember) {
    const index = members.indexOf(member)
    if (index !== -1) {
      members.splice(index, 1)
    }
  },
  select(member: SidebarMember) {
    const name = member.name
    if (name !== innerCurrent.value) {
      innerCurrent.value = name
      emit('update:modelValue', name)
      emit('change', name)
    }
  },
})

provide(sidebarContextKey, context)

defineExpose<SidebarExpose>({})
</script>
