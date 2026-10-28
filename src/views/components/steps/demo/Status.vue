<template>
  <!-- 工业语境：工单下发与报警处置流程｜Status 用法演示 -->
  <s-list card>
    <s-list-item title="上一步" @click="prevStep" arrow hover />
    <s-list-item title="下一步" @click="nextStep" arrow hover />
    <s-list-item>
      <s-steps :current="current" :item-list="itemList" direction="vertical" status="finish" />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type StepsItem } from 'sard'

const current = ref(1)

const itemList: StepsItem[] = [
  { name: '工单已下发', description: '10-27 09:00' },
  { name: '等待授权', description: '10-27 09:06' },
  { name: '首件已确认', description: '10-27 09:14' },
]

const prevStep = () => {
  current.value = current.value <= -1 ? 2 : current.value - 1
}

const nextStep = () => {
  current.value = current.value >= 2 ? -1 : current.value + 1
}
</script>
