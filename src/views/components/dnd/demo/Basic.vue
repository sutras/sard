<template>
  <!-- 工业语境：看板卡片排序（工单优先级调整）｜Basic 用法演示 -->
  <s-list card>
    <s-dnd v-model:list="listData" #default="{ list }">
      <s-dnd-item v-for="{ data, key, itemInfo } in list" :item-info="itemInfo" :key="key">
        <s-list-item :title="data.title">
          <template #value>
            <s-dnd-handle>
              <s-text color="tertiary" size="large">
                <List />
              </s-text>
            </s-dnd-handle>
          </template>
        </s-list-item>
      </s-dnd-item>
    </s-dnd>
  </s-list>
</template>

<script setup lang="ts">
import { List } from '@sard/icons'
import { ref } from 'vue'

const tasks = [
  '注塑机-A2 · 换模',
  'CNC-Lathe-01 · 精车',
  '压铸机-D03 · 检修',
  'AGV-03 · 换电',
  '空压机-C01 · 换滤芯',
]

const listData = ref(tasks.map((title) => ({ title })))
</script>
