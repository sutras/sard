<template>
  <div :class="bem.e('item')">
    <slot>
      <div :class="[bem.e('content'), contentClass]" :style="contentStyle" @click="onClick">
        <slot name="content">
          <div v-if="slots.icon" :class="bem.e('icon')">
            <slot name="icon"></slot>
          </div>
          <div v-if="slots.text || text" :class="bem.e('text')">
            <slot name="text">{{ text }}</slot>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '../../utils'
import { type GridItemProps, type GridItemSlots, type GridItemEmits } from './common'

const props = withDefaults(defineProps<GridItemProps>(), {})

const slots = defineSlots<GridItemSlots>()

const emit = defineEmits<GridItemEmits>()

const bem = createBem('grid')

const onClick = (event: any) => {
  emit('click', event)
}
</script>
