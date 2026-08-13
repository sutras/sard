<template>
  <div :class="bem.b()">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, toRef } from 'vue'
import { createBem } from '../../utils'
import {
  type AvatarGroupProps,
  type AvatarGroupSlots,
  type AvatarGroupEmits,
  type AvatarGroupExpose,
  defaultAvatarGroupProps,
  avatarGroupContextKey,
} from './common'

const props = withDefaults(defineProps<AvatarGroupProps>(), defaultAvatarGroupProps)

defineSlots<AvatarGroupSlots>()

const emit = defineEmits<AvatarGroupEmits>()

const bem = createBem('avatar-group')

// main

provide(
  avatarGroupContextKey,
  reactive({
    total: toRef(() => props.total),
    max: toRef(() => props.max),
    showRemain: toRef(() => props.showRemain),
    coverage: toRef(() => props.coverage),
    remainText: toRef(() => props.remainText ?? `+${props.total - props.max}`),
    onRemainClick: (event: MouseEvent) => {
      emit('remain-click', event)
    },
  }),
)

// others
defineExpose<AvatarGroupExpose>({})
</script>
