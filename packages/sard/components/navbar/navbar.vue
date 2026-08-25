<template>
  <div v-bind="$attrs" :class="navbarClass">
    <StatusBar v-if="statusBar" />
    <div :class="[bem.e('wrapper'), bem.is('divider', showDivider)]">
      <div v-if="slots.start || showBack" :class="bem.e('start')">
        <NavbarItem v-if="showBack" :class="bem.is('back')" @click="onBack">
          <template #icon>
            <Left />
          </template>
          {{ backText }}
        </NavbarItem>
        <slot name="start"></slot>
      </div>
      <div :class="bem.e('content')">
        <slot>
          <div :class="bem.e('title')">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
        </slot>
      </div>
      <div v-if="slots.end" :class="bem.e('end')">
        <slot name="end"></slot>
      </div>
    </div>
  </div>
  <NavbarPit v-if="fixed" :status-bar="statusBar" />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { createBem } from '../../utils'
import { type NavbarEmits, type NavbarProps, type NavbarSlots } from './common'
import NavbarItem from './navbar-item.vue'
import StatusBar from '../status-bar/status-bar.vue'
import NavbarPit from '../navbar-pit/navbar-pit.vue'
import { windowInfo } from '../config/windowInfo'
import { Left } from '@sard/icons'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<NavbarProps>(), {})

const slots = defineSlots<NavbarSlots>()

const emit = defineEmits<NavbarEmits>()

const bem = createBem('navbar')

onMounted(() => {
  if (props.fixed) {
    windowInfo.navBarHeight = 44
  }
})

onBeforeUnmount(() => {
  if (props.fixed) {
    windowInfo.navBarHeight = 0
  }
})

const onBack = (event: any) => {
  emit('back', event)
}

// ============================ style ============================
const navbarClass = computed(() => {
  return [
    bem.b(),
    bem.m('flow', props.flow),
    bem.m('custom', !!slots.default),
    bem.m('fixed', props.fixed),
  ]
})
</script>
