<template>
  <!-- 工业语境：同一段记录在不同行数、位置、展开状态下重新计算截断点 -->
  <s-list card>
    <s-list-item>
      <s-segmented v-model="text" :options="contentOptions" />
    </s-list-item>
    <s-list-item>
      <s-segmented v-model="rows" :options="rowOptions" />
    </s-list-item>
    <s-list-item>
      <s-segmented v-model="position" :options="positionOptions" />
    </s-list-item>
    <s-list-item>
      <s-segmented v-model="expanded" :options="expandOptions" />
    </s-list-item>
    <s-list-item>
      <s-ellipsis
        :content="text"
        expand-text="展开"
        collapse-text="收起"
        :expanded="expanded"
        :rows="rows"
        :position="position"
        @change="onChange"
      />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { alarmRecord, sopExcerpt } from './shared'
import { type EllipsisPosition } from 'sard'

const contentOptions = [
  { label: '报警处置记录', value: alarmRecord },
  { label: '换模规程', value: sopExcerpt },
]

const positionOptions = [
  { label: '头部', value: 'start' },
  { label: '中部', value: 'middle' },
  { label: '尾部', value: 'end' },
]

const rowOptions = [
  { label: '1行', value: 1 },
  { label: '2行', value: 2 },
  { label: '3行', value: 3 },
]

const expandOptions = [
  { label: '展开', value: true },
  { label: '收起', value: false },
]

const text = ref(alarmRecord)
const rows = ref(2)
const position = ref<EllipsisPosition>('start')

const expanded = ref(false)

const onChange = (value: boolean) => {
  expanded.value = value
}
</script>
