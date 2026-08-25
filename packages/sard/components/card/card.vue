<template>
  <div :class="cardClass" @click="onClick">
    <div v-if="slots.icon" :class="bem.e('icon')">
      <slot name="icon"></slot>
    </div>
    <div :class="bem.e('content')">
      <div v-if="!headless" :class="bem.e('header')">
        <div :class="bem.e('title')">
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="bem.e('extra')">
          <slot name="extra">{{ extra }}</slot>
          <Button
            v-if="collapsible"
            variant="link"
            auto-height
            color="secondary"
            @click="innerCollapsed = !innerCollapsed"
            #icon
          >
            <slot name="arrow" :collapsed="innerCollapsed">
              <Down v-if="innerCollapsed" />
              <Up v-else />
            </slot>
          </Button>
        </div>
      </div>
      <Collapse :visible="!isCollapsed">
        <div :class="bem.e('body')">
          <slot></slot>
        </div>
        <div v-if="!footless" :class="bem.e('footer')">
          <slot name="footer">{{ footer }}</slot>
        </div>
      </Collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useModel } from 'vue'
import { createBem, isVisibleEmpty } from '../../utils'
import { type CardProps, type CardSlots, type CardEmits } from './common'
import Collapse from '../collapse/collapse.vue'
import Button from '../button/button.vue'
import { Down, Up } from '@sard/icons'

const props = withDefaults(defineProps<CardProps>(), {})

const slots = defineSlots<CardSlots>()

const emit = defineEmits<CardEmits>()

const bem = createBem('card')

const headless = computed(() => {
  return isVisibleEmpty(props.title) && !slots.title && isVisibleEmpty(props.extra) && !slots.extra
})

const footless = computed(() => {
  return isVisibleEmpty(props.footer) && !slots.footer
})

const onClick = (event: any) => {
  emit('click', event)
}

// ============================ collapsed ============================
const innerCollapsed = useModel(props, 'collapsed')

const isCollapsed = computed(() => props.collapsible && innerCollapsed.value)

// ============================ style ============================
const cardClass = computed(() => {
  return [
    bem.b(),
    bem.m('hover', props.hover),
    bem.m('headless', headless.value),
    bem.m('footless', footless.value),
    bem.m('head-borderless', props.hideHeaderBorder),
    bem.m('foot-borderless', props.hideFooterBorder),
    bem.m('collapsed', isCollapsed.value),
    bem.has('icon', slots.icon),
  ]
})
</script>
