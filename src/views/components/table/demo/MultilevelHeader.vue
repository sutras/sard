<template>
  <!-- 演示工艺参数分组表头：设备信息 / 工艺参数 / 质量与合规 三段归并，操作列固定右侧 -->
  <s-table
    bordered
    :columns="multiColumns"
    :data="data"
    style="height: 250px"
    aria-label="设备工艺参数分组表"
    data-scene="process-parameter-table"
  >
    <template #interlock="{ row }">
      <s-tag
        :color="row.interlock === '已闭合' ? 'success' : 'danger'"
        variant="outlined"
        size="small"
      >
        {{ row.interlock }}
      </s-tag>
    </template>
    <template #action="{ row }">
      <s-button
        size="small"
        variant="link"
        :aria-label="`为 ${row.code} 下发给定工单`"
        @click="onDispatch(row.code)"
      >
        派工
      </s-button>
    </template>
  </s-table>
</template>

<script setup lang="ts">
import { toast } from 'sard'
import { multiColumns, data } from './data'

const onDispatch = (code: string) => {
  toast(`已向 ${code} 下发给定工单，等待班组长授权`)
}
</script>
