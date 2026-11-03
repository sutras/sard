<template>
  <s-card>
    <s-segmented v-model="index" :options="scenarioOptions" />

    <div
      class="mt-4.5 box-border w-[200px] rounded-lg bg-(--s-bg-color-layout) px-3.5 py-2.5 text-[15px] leading-snug"
    >
      <s-text-shrink ref="shrink">
        <template v-for="(segment, i) in current.segments" :key="i">
          <b v-if="segment.emphasis" :class="segment.danger && 'text-(--s-color-danger)'">
            {{ segment.text }}
          </b>
          <template v-else>{{ segment.text }}</template>
        </template>
      </s-text-shrink>
    </div>

    <s-text tag="div" size="small" color="tertiary" class="mt-3.5 tabular-nums">
      200px 宽 · 关键片段单独强调，缩到 {{ sizeText }} 完整显示
    </s-text>
  </s-card>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

interface Segment {
  text: string
  /** 该片段加粗，danger 时再加警示色 */
  emphasis?: boolean
  danger?: boolean
}

const scenarios: { label: string; segments: Segment[] }[] = [
  {
    label: '温度告警',
    segments: [
      { text: '注塑机-A2 ' },
      { text: '超温', emphasis: true, danger: true },
      { text: '：当前 82°C，已持续 32 min' },
    ],
  },
  {
    label: '维护公告',
    segments: [
      { text: '周六 ' },
      { text: '00:00–06:00', emphasis: true },
      { text: ' MES 升级，工单下发暂停' },
    ],
  },
]

const scenarioOptions = scenarios.map((item, value) => ({ label: item.label, value }))

const index = ref(0)
const current = computed(() => scenarios[index.value])

const shrink = useTemplateRef<{ fontSize?: number }>('shrink')

const sizeText = computed(() => {
  const fontSize = shrink.value?.fontSize
  return fontSize ? `${fontSize}px` : '…'
})
</script>
