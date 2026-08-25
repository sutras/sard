<template>
  <div
    :class="[bem.e('item'), bem.is('disabled', props.disabled), bem.is('loading', props.loading)]"
    @click="onClick"
  >
    <template v-if="!props.loading">
      <slot v-if="slots.default"></slot>
      <template v-else>
        <div :class="bem.e('item-label')" :style="labelStyle">
          <slot name="label">{{ props.label }}</slot>
        </div>
        <div v-if="props.description || slots.description" :class="bem.e('item-description')">
          <slot name="description">{{ props.description }}</slot>
        </div>
      </template>
    </template>
    <div v-else :class="bem.e('loading')">
      <Loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createBem } from '../../utils'
import Loading from '../loading/loading.vue'
import {
  type ActionSheetItemProps,
  type ActionSheetItemEmits,
  type ActionSheetItemSlots,
} from './common'
import { useActionSheetItem } from './context'

const props = withDefaults(defineProps<ActionSheetItemProps>(), {
  loading: false,
  disabled: false,
})

const slots = defineSlots<ActionSheetItemSlots>()

const emit = defineEmits<ActionSheetItemEmits>()

const bem = createBem('action-sheet')

const { select } = useActionSheetItem(props)

const labelStyle = computed(() => {
  return { color: props.color }
})

const onClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
    select()
  }
}
</script>
