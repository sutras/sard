<template>
  <!-- 工业语境：工单下发与报警处置流程｜StepStatus 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-steps :item-list="itemList" direction="vertical" />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { type StepsItem } from 'sard'

const itemList: StepsItem[] = [
  { name: '参数设定', description: '已完成', status: 'finish' },
  { name: '空运行', description: '调试中', status: 'process' },
  { name: '首件检验', description: '未开始', status: 'wait' },
  { name: '批量生产', description: '已完成', status: 'finish' },
  { name: '报工入库', description: '联锁未验证', status: 'error' },
]
</script>
