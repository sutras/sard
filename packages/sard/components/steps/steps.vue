<template>
  <div :class="stepsClass">
    <slot>
      <Step
        v-for="(item, i) in itemList"
        :key="i"
        :index="i"
        :status="item.status"
        :name="item.name"
        :description="item.description"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, toRef } from 'vue'
import { createBem } from '../../utils'
import Step from './step.vue'
import { type StepsProps, type StepsSlots, defaultStepsProps, stepsContextKey } from './common'

const props = withDefaults(defineProps<StepsProps>(), defaultStepsProps)

defineSlots<StepsSlots>()

const bem = createBem('steps')

// main
provide(
  stepsContextKey,
  reactive({
    current: toRef(() => props.current),
    direction: toRef(() => props.direction),
    center: toRef(() => props.center),
    status: toRef(() => props.status),
    reverse: toRef(() => props.reverse),
  }),
)

// others
const stepsClass = computed(() => {
  return [bem.b(), bem.m(props.direction)]
})
</script>
