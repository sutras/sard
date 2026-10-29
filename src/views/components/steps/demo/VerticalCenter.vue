<template>
  <s-list card>
    <s-list-item title="上一步" @click="prevStep" arrow hover />
    <s-list-item title="下一步" @click="nextStep" arrow hover />
    <s-list-item>
      <s-steps :current="current" :item-list="itemList" direction="vertical" center />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type StepsItem } from 'sard'

const current = ref(1)

const itemList: StepsItem[] = [
  { name: '下发工单', description: '需班组长授权' },
  { name: '班组长授权', description: '需班组长授权' },
  { name: '设备启动', description: '需班组长授权' },
]

const prevStep = () => {
  current.value = current.value <= 0 ? 3 : current.value - 1
}

const nextStep = () => {
  current.value = current.value >= 3 ? 0 : current.value + 1
}
</script>
