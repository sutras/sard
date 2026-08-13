<template>
  <div ref="scroll" :class="tabsClass">
    <div ref="wrapper" :class="bem.e('wrapper')">
      <slot>
        <Tab v-for="(item, index) in options" :key="index" v-bind="item" />
      </slot>
      <div
        v-if="type === 'line'"
        :class="bem.e('line')"
        :style="lineStyle"
        @transitionend="onLineTransitionEnd"
      >
        <slot name="line"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, provide, watch, reactive, useTemplateRef, useModel, onMounted } from 'vue'
import { createBem, scrollToTarget } from '../../utils'
import {
  type TabsProps,
  type TabsSlots,
  type TabsEmits,
  tabContextKey,
  defaultTabsProps,
  type TabMember,
} from './common'
import Tab from './tab.vue'
import { useResizeObserver } from '../../use'

const props = withDefaults(defineProps<TabsProps>(), defaultTabsProps)

defineSlots<TabsSlots>()

const emit = defineEmits<TabsEmits>()

const bem = createBem('tabs')

// main

const innerValue = useModel(props, 'modelValue')

const members: TabMember[] = []

provide(
  tabContextKey,
  reactive({
    value: innerValue,
    addMember(member) {
      members.push(member)
    },
    removeMember(member) {
      const index = members.indexOf(member)
      if (index !== -1) {
        members.splice(index, 1)
      }
    },
    select(member) {
      if (innerValue.value !== member.value) {
        innerValue.value = member.value
        emit('change', member.value)
      }
    },
  }),
)

// line

const lineLeft = ref(0)
const lineAnimated = ref(false)

const wrapperRef = useTemplateRef('wrapper')

function updateLineLeft(animated?: boolean) {
  const member = members.find((item) => item.value === innerValue.value)
  if (member) {
    const tabRect = member.el.getBoundingClientRect()
    const wrapperRect = wrapperRef.value!.getBoundingClientRect()
    lineLeft.value = tabRect.left - wrapperRect.left + tabRect.width / 2

    lineAnimated.value = false
    if (animated) {
      lineAnimated.value = true
    }
  }
}

const onLineTransitionEnd = () => {
  lineAnimated.value = false
}

onMounted(() => {
  updateLineLeft(false)
})

watch(
  [innerValue, () => props.type, () => props.options],
  () => {
    if (props.type === 'line') {
      updateLineLeft(true)
    }
  },
  {
    flush: 'post',
  },
)

const wrapperSize = useResizeObserver(wrapperRef)

watch(
  () => wrapperSize.width,
  (width, oldWidth) => {
    if (Math.abs(width - oldWidth) > 1) {
      updateLineLeft(false)
    }
  },
)

const lineStyle = computed(() => {
  return {
    left: lineLeft.value + 'px',
    transitionDuration: lineAnimated.value ? '' : '0s',
  }
})

// scroll

const scrollRef = useTemplateRef('scroll')

const needScrollToTab = computed(() => {
  return props.type === 'line' || (props.type === 'pill' && props.scrollable)
})

const scrollToTab = (animated?: boolean) => {
  const member = members.find((item) => item.value === innerValue.value)
  if (!member) return

  scrollToTarget(scrollRef.value!, member.el, {
    animated,
    position: 'center',
  })
}

onMounted(() => {
  if (needScrollToTab.value) {
    scrollToTab(false)
  }
})

watch(
  [innerValue, () => props.type, () => props.options],
  () => {
    if (needScrollToTab.value) {
      scrollToTab(true)
    }
  },
  {
    flush: 'post',
  },
)

// others
const tabsClass = computed(() => {
  return [bem.b(), bem.m(props.type), bem.m('scrollable', props.scrollable)]
})
</script>
