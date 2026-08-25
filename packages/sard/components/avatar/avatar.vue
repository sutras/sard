<template>
  <div :class="avatarClass" :style="avatarStyle" @click="onClick">
    <slot>
      <img v-if="src" :src="src" mode="aspectFill" :class="[bem.e('image'), bem.m(shape)]" />
      <Person v-else :class="bem.e('icon')" />
    </slot>
    <slot name="extra"></slot>

    <div
      v-if="context && context.showRemain && context.total > context.max && isLast"
      :class="bem.e('remain')"
      @click="context.onRemainClick"
    >
      {{ context.remainText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createBem, cssVar, cssVarName } from '../../utils'
import {
  type AvatarEmits,
  type AvatarProps,
  type AvatarSlots,
  defaultAvatarProps,
  avatarGroupContextKey,
} from './common'
import { Person } from '@sard/icons'

const props = withDefaults(defineProps<AvatarProps>(), defaultAvatarProps)

defineSlots<AvatarSlots>()

const emit = defineEmits<AvatarEmits>()

const bem = createBem('avatar')

const context = inject(avatarGroupContextKey, null)

const isLast = computed(() => context && context.max - 1 === props.index)

const onClick = (event: any) => {
  emit('click', event)
}

// ============================ style ============================
const avatarClass = computed(() => {
  return [bem.b(), bem.m(props.shape), bem.m('in-group', !!context)]
})

const avatarStyle = computed(() => {
  return {
    [cssVarName('avatar-size')]: props.size,
    color: props.color,
    fontSize: props.iconSize,
    background: props.background,
    marginInlineStart:
      context && props.index !== 0 ? `calc(${cssVar('avatar-size')} * ${-context.coverage})` : '',
  }
})
</script>
